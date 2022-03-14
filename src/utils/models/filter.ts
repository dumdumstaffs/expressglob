import { NextApiRequest } from "next"
import { Query } from "mongoose"
import { ChangeKey } from "@/types"
import { ensureArray } from "@/utils/helpers"

export type FilterField<T> = {
    type: "string" | "boolean" | "number" | "comparison"
    field: keyof T & string
}

export type FilterString<T> = keyof T & string

export type FilterExpression<T> = FilterString<T> | FilterString<T>[] | FilterField<T> | FilterField<T>[]

type MongoQueryFilter = {
    [key: `$${string}`]: string | number
}

export class ModelFilter<T> {
    private req: NextApiRequest
    private instance: Query<T[], T>
    private fields: FilterField<T>[]

    constructor(req: NextApiRequest, instance: Query<T[], T>, fields: FilterExpression<T>) {
        this.req = req
        this.fields = this.initialiseFields(fields)
        this.instance = instance
    }

    public filter() {
        if (!this.filterQuery().length) return this.instance

        return this.instance.find({
            $and: this.filterQuery(),
        })
    }

    private filterExpressionFromQuery() {
        // filter only if query params has a value which is included in the filter fields
        return Object.keys(this.req.query)
            // remove query params with empty or falsy values
            .filter((queryKey) => !!this.req.query[queryKey])
            // remove query param not in the filter fields
            .filter((queryKey): queryKey is keyof T & string => this.fields.some(({ field }) => field === queryKey))
            // return filter fields with correct type
            .reduce((acc, curr) => {
                const queryValue: string = ensureArray(this.req.query[curr])[0]
                return { ...acc, [curr]: queryValue }
            }, {} as { [P in keyof T]: string })
    }

    private filterQuery() {
        const queryFilterExpression = this.filterExpressionFromQuery()

        const pipes = this.fields
            // create pipe for only fields in the query filter fields
            .filter(({ field }) => !!queryFilterExpression[field])
            // return pipe for each field
            .map(({ field, type }) => ({
                [field]: this.getFilterQuery(type, queryFilterExpression[field]),
            }))

        return pipes as ChangeKey<typeof pipes[number], keyof T>[]
    }

    private getFilterQuery(type: FilterField<T>["type"], value: string) {
        switch (type) {
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

    private getComparisonParams(value: string): [string, number] {
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
        return [newMode, comparisonNumber]
    }

    private initialiseFields(fields: FilterExpression<T>) {
        // convert to array if string is provided
        return ensureArray(fields).map((field) => {
            if (typeof field === "string") {
                return {
                    field,
                    type: "string",
                } as FilterField<T>
            }
            return field
        })
    }
}
