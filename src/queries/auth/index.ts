import { useQuery } from "react-query";
import * as authRequests from "@/requests/auth"

export const AuthQueryKey = ["profile"]

export const useAuth = () => useQuery(AuthQueryKey, authRequests.getProfile)

export * from "./mutations"