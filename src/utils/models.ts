import { NextApiRequest } from "next"
import { Schema, FilterQuery, Query } from "mongoose"
import { PaginatedResponse } from "@/types"
import { ensureArray } from "@/utils/helpers"

export abstract class ModelPlugin<TDocument, TModel> {

    constructor(protected readonly Schema: Schema<TDocument, TModel>) { }

    protected abstract applyHooks(): void

    protected abstract applyVirtuals(): void

    protected abstract applyMethods(): void

    protected abstract applyQueries(): void

    protected abstract applyStatics(): void

    public apply() {
        this.applyHooks()
        this.applyVirtuals()
        this.applyMethods()
        this.applyQueries()
        this.applyStatics()
    }
}

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

type MongoQueryFilter = {
    [key: `$${string}`]: string | number
}

type Field = {
    type: "string" | "boolean" | "number" | "comparison"
    field: string
}

export type FilterFields = string | string[] | Field | Field[]

export class ModelFilter<T> {
    private req: NextApiRequest
    private instance: Query<T[], T>
    private fields: Field[]

    constructor(req: NextApiRequest, instance: Query<T[], T>, fields: FilterFields) {
        this.req = req
        this.fields = this.initialiseFields(fields)
        this.instance = instance
    }

    public filter() {
        if (!this.shouldFilter()) return this.instance

        const filter = {
            $and: this.pipe(),
        } as FilterQuery<T>

        return this.instance.find(filter)
    }

    private shouldFilter() {
        // filter only if req.query has a value and is included in the filter fields
        return Object.keys(this.req.query).some(
            (queryParam) =>
                this.req.query[queryParam] &&
                this.fields.some(({ field }) => field.includes(queryParam))
        )
    }

    private pipe() {
        return this.fields
            .filter((field) => !!this.req.query[field.field]) // filter only fields in req.query
            .map((field) => ({
                [field.field]: this.getPipeQuery(
                    field,
                    this.req.query[field.field] as string
                ),
            }))
    }

    private getPipeQuery(field: Field, value: string) {
        switch (field.type) {
            case "string":
                return {
                    $regex: value,
                    $options: "i",
                }

            case "boolean":
                return value.toLowerCase() === "true"

            case "number":
                if (isNaN(parseInt(value))) throw new Error("Invalid Number")
                return parseInt(value)

            case "comparison":
                return this.getComparisonQuery(value)

            default:
                throw new Error("Invalid Type")
        }
    }

    private getComparisonQuery(value: string): MongoQueryFilter {
        // fail if no comparison boundary
        if (value.indexOf(":") < 1) throw new Error("Invalid Comparison")

        if (value.indexOf(",") < 1) {
            // one comparison boundary
            const [mode, comparison] = this.getComparisonParams(value)
            return {
                ["$" + mode]: comparison,
            } as const
        } else {
            // more than one comparison boundary (only accepts two boundaries)
            const [value1, value2] = value.split(",")
            const [mode1, comparison1] = this.getComparisonParams(value1)
            const [mode2, comparison2] = this.getComparisonParams(value2)
            return {
                ["$" + mode1]: comparison1,
                ["$" + mode2]: comparison2,
            } as const
        }
    }

    private getComparisonParams(value: string) {
        const [mode, val] = value.split(":")

        if (!["gt", "lt", "gte", "lte"].includes(mode)) {
            throw new Error("Invalid Comparison")
        }

        let newMode = mode
        let comparisonNumber = parseFloat(val)

        if (isNaN(comparisonNumber)) {
            throw new Error("Invalid Comparison")
        }
        if (mode === "gte") {
            newMode = "gt"
            comparisonNumber--
        }
        if (mode === "lte") {
            newMode = "lt"
            comparisonNumber++
        }
        return [newMode, comparisonNumber] as const
    }

    private initialiseFields(fields: FilterFields) {
        // convert to array if single field is provided
        // convert to field object
        return ensureArray(fields).map((field) => {
            if (typeof field === "string")
                return {
                    field,
                    type: "string",
                } as Field
            return field
        })
    }
}
