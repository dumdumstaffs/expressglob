import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { ShipmentQueryKey, ShipmentsQueryKey } from '.'
import { ShipmentRequests } from './requests'

export const useCreateShipmentMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(ShipmentRequests.create, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentsQueryKey)
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useUpdateShipmentMutation = (trackingId: string) => {
    const queryClient = useQueryClient()

    function mutateFn(shipmentData: Parameters<typeof ShipmentRequests.update>[1]) {
        return ShipmentRequests.update(trackingId, shipmentData)
    }

    const mutation = useMutation(mutateFn, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const usePushShipmentLocationMutation = (trackingId: string) => {
    const queryClient = useQueryClient()

    function mutateFn(locationData: Parameters<typeof ShipmentRequests.pushLocation>[1]) {
        return ShipmentRequests.pushLocation(trackingId, locationData)
    }

    const mutation = useMutation(mutateFn, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useUpdateShipmentLocationMutation = (trackingId: string, locationId: string) => {
    const queryClient = useQueryClient()

    function mutateFn(locationData: Parameters<typeof ShipmentRequests.updateLocation>[2]) {
        return ShipmentRequests.updateLocation(trackingId, locationId, locationData)
    }

    const mutation = useMutation(mutateFn, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useRemoveShipmentLocationMutation = (trackingId: string, locationId: string) => {
    const queryClient = useQueryClient()

    function mutateFn() {
        return ShipmentRequests.removeLocation(trackingId, locationId)
    }

    const mutation = useMutation(mutateFn, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const usePushShipmentImageMutation = (trackingId: string) => {
    const queryClient = useQueryClient()

    function mutateFn(imageData: Parameters<typeof ShipmentRequests.pushImage>[1]) {
        return ShipmentRequests.pushImage(trackingId, imageData)
    }

    const mutation = useMutation(mutateFn, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}

export const useRemoveShipmentImageMutation = (trackingId: string) => {
    const queryClient = useQueryClient()

    function mutateFn(imageId: string) {
        return ShipmentRequests.removeImage(trackingId, imageId)
    }

    const mutation = useMutation(mutateFn, {
        onSuccess() {
            return queryClient.invalidateQueries(ShipmentQueryKey(trackingId))
        },
    })

    const axiosError = axios.isAxiosError(mutation.error) ? mutation.error : null

    return { ...mutation, axiosError }
}