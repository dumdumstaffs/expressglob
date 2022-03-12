import { PaginatedQueryKey, usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import * as adminRequests from "@/requests/admin"

export const AdminQueryKey = ["admins"] as PaginatedQueryKey

export const useAdmins = () => usePaginatedQuery(AdminQueryKey, adminRequests.getAll)

export * from "./mutations"