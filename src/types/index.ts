export type PaginatedResponse<T> = {
    data: T[]
    page: number
    limit: number
    total: number
    cursor: {
        next: number | null
        prev: number | null
    }
}

export type WithDate<T extends { [k: string]: any }, O extends keyof T> = Omit<T, O> & { [K in O]: Date }

export type ChangeKey<T extends { [k: string]: any }, K extends keyof any> = { [P in K]: T[keyof T] }