import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as adminRequests from "@/requests/admin"
import { AdminQueryKey } from ".";

export const useCreateAdminMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(adminRequests.create, {

        onSuccess() {
            return queryClient.invalidateQueries(AdminQueryKey)
        },

    })

    const axiosError = mutation.error && axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useRemoveAdminMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(adminRequests.remove, {

        onSuccess() {
            return queryClient.invalidateQueries(AdminQueryKey)
        },

    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}