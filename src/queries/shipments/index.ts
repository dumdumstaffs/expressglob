import { useQuery } from "react-query"
import { PaginatedQueryKey, usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { ShipmentRequests } from "./requests"

export const ShipmentsQueryKey = ["shipments"] as PaginatedQueryKey

export const useShipments = () => {

    const paginatedShipmentQuery = usePaginatedQuery(ShipmentsQueryKey, ShipmentRequests.getAll)

    return paginatedShipmentQuery
}

export const ShipmentQueryKey = (trackingId: string) => [ShipmentsQueryKey, trackingId]

export const useShipment = (trackingId?: string) => useQuery(ShipmentQueryKey(trackingId), () => ShipmentRequests.get(trackingId), {
    enabled: !!trackingId,
    retry: false
})

export * from "./mutations"