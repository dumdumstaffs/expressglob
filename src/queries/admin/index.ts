import { PaginatedQueryKey, usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { AdminRequests } from "./requests"

export const AdminQueryKey = ["admins"] as PaginatedQueryKey

export const useAdmins = () => usePaginatedQuery(AdminQueryKey, AdminRequests.getAll)

export * from "./mutations"