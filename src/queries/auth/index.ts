import { useQuery } from "react-query";
import { AuthRequests } from "./requests"

export const AuthQueryKey = ["profile"]

export const useAuth = () => useQuery(AuthQueryKey, AuthRequests.getProfile)

export * from "./mutations"