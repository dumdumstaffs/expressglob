import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { AdminQueryKey } from ".";
import { AdminRequests } from "./requests"

export const useCreateAdminMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(AdminRequests.create, {

        onSuccess() {
            return queryClient.invalidateQueries(AdminQueryKey)
        },

    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useRemoveAdminMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(AdminRequests.remove, {

        onSuccess() {
            return queryClient.invalidateQueries(AdminQueryKey)
        },

    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}