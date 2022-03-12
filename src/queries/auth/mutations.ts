import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import * as authRequests from "@/requests/auth"
import { AuthQueryKey } from ".";

export const useLoginMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation(authRequests.login, {

        onMutate() {
            return queryClient.cancelQueries(AuthQueryKey)
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries(AuthQueryKey)

            router.push("/manager")
        },

    })

    const axiosError = mutation.error && axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useLogoutMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation(authRequests.logout, {

        onMutate() {
            return queryClient.cancelQueries(AuthQueryKey)
        },

        onSuccess() {
            queryClient.removeQueries(AuthQueryKey)

            router.push("/secure/login")
        },

    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}