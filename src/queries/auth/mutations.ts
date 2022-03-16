import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { AuthQueryKey } from ".";
import { AuthRequests } from "./requests";

export const useLoginMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation(AuthRequests.login, {

        onMutate() {
            return queryClient.cancelQueries(AuthQueryKey)
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries(AuthQueryKey)

            router.push("/manager")
        },

    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useLogoutMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation(AuthRequests.logout, {

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