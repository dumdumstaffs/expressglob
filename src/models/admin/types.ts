import { NextApiRequest } from "next"
import { Model, Query } from "mongoose"
import { FilterExpression } from "@/utils/models"
import { PaginatedResponse, WithDate } from "@/types"
import { Admin } from "@/types/admin"

// document dates
type AdminDates = "createdAt" | "updatedAt"

// document instance
export interface AdminDocument extends WithDate<Admin, AdminDates> {
    password: string
}

// document overrides
interface AdminOverrides {
    validatePassword(passwordAttempt: string): Promise<boolean>
}

// query helpers
interface AdminQueryHelpers {
    filter(
        req: NextApiRequest,
        fields: FilterExpression<AdminDocument>
    ): Query<AdminDocument[], AdminDocument> & AdminQueryHelpers

    paginate(req: NextApiRequest): Promise<PaginatedResponse<InstanceType<AdminModel>>>
}

// static methods
export interface AdminModel extends Model<AdminDocument, AdminQueryHelpers, AdminOverrides> { }