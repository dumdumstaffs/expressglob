import { NextApiRequest } from "next"
import { Query } from "mongoose"
import { PaginatedResponse } from "@/types"

export class ModelPaginate<T> {
    private req: NextApiRequest
    private instance: Query<T[], T>
    private query: new (...args: any) => Query<T[], T>

    constructor(req: NextApiRequest, instance: Query<T[], T>) {
        this.req = req
        this.instance = instance
        this.query = instance.toConstructor()
    }

    paginate() {
        // return raw query if paginate is explicitly disabled
        if (this.shouldSkipPagination()) return Promise.resolve(this.instance)

        return this.getPaginatedData()
    }

    shouldSkipPagination() {
        return this.req.query.paginate === "false"
    }

    async getPaginatedData(): Promise<PaginatedResponse<T>> {
        const page = Math.abs(parseInt(this.req.query.page as string)) || 1
        const limit = Math.abs(parseInt(this.req.query.limit as string)) || 10

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const total = await new this.query().countDocuments()
        const data = await new this.query().limit(limit).skip(startIndex)

        // build paginated results
        return {
            data,
            page,
            limit,
            total,
            cursor: {
                next: endIndex < total ? page + 1 : null,
                prev: startIndex > 0 ? page - 1 : null,
            },
        }
    }
}