import { NextApiRequest } from "next"
import { Model, Query } from "mongoose"
import { FilterFields } from "@/utils/models"
import { PaginatedResponse } from "@/types"
import { Admin } from "@/types/admin"

// document instance
export interface AdminDocument extends Admin {
    password: string
    validatePassword(passwordAttempt: string): Promise<boolean>
}

// document overrides
interface AdminOverrides { }

// query helpers
interface AdminQueryHelpers {
    filter(
        req: NextApiRequest,
        fields: FilterFields
    ): Query<AdminDocument[], AdminDocument> & AdminQueryHelpers

    paginate(req: NextApiRequest): Promise<PaginatedResponse<AdminDocument>>
}

// static methods
export interface AdminModel extends Model<AdminDocument, AdminQueryHelpers, AdminOverrides> { }