import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as shipmentsRequests from "@/requests/shipment"
import { ShipmentQueryKey, ShipmentsQueryKey } from ".";
import { ShipmentPushLocationDto, ShipmentUpdateDto, ShipmentUpdateLocationDto } from "@/schemas/shipment";

export const useCreateShipmentMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(shipmentsRequests.create, {

        onSuccess() {
            return queryClient.invalidateQueries(ShipmentsQueryKey)
        },

    })

    const axiosError = mutation.error && axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useUpdateShipmentMutation = (trackingId: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation((shipmentData: ShipmentUpdateDto) => shipmentsRequests.update(trackingId, shipmentData), {

        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },

    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const usePushShipmentLocationMutation = (trackingId: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation((locationData: ShipmentPushLocationDto) => shipmentsRequests.pushLocation(trackingId, locationData), {

        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },

    })

    const axiosError = mutation.error && axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useUpdateShipmentLocationMutation = (trackingId: string, locationId: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation((locationData: ShipmentUpdateLocationDto) => shipmentsRequests.updateLocation(trackingId, locationId, locationData), {

        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },

    })

    const axiosError = mutation.error && axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useRemoveShipmentLocationMutation = (trackingId: string, locationId: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(() => shipmentsRequests.removeLocation(trackingId, locationId), {

        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },

    })

    const axiosError = mutation.error && axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}