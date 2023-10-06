import { FilterExpression } from "@api/utils/models";
import {
  FilterQueryParams,
  PaginationQueryParams,
} from "@api/utils/models/query";
import { Admin } from "@shared/types/admin";
import { PaginatedResponse } from "@shared/types/pagination";
import { WithDate } from "@shared/types/transformers";
import { Model, Query } from "mongoose";

// document dates
type AdminDates = "createdAt" | "updatedAt";

// document instance
export interface AdminDocument extends WithDate<Admin, AdminDates> {
  password: string;
}

// document overrides
interface AdminOverrides {
  validatePassword(passwordAttempt: string): Promise<boolean>;
}

// query helpers
interface AdminQueryHelpers {
  filter(
    query: FilterQueryParams,
    fields: FilterExpression<AdminDocument>,
  ): Query<AdminDocument[], AdminDocument> & AdminQueryHelpers;

  paginate(
    query: PaginationQueryParams,
  ): Promise<PaginatedResponse<InstanceType<AdminModel>>>;
}

// static methods
export interface AdminModel
  extends Model<AdminDocument, AdminQueryHelpers, AdminOverrides> {}
