import { useQuery } from "react-query"
import { PaginatedQueryKey, usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import * as shipmentRequests from "@/requests/shipment"

export const ShipmentsQueryKey = ["shipments"] as PaginatedQueryKey

export const useShipments = () => {

    const paginatedShipmentQuery = usePaginatedQuery(ShipmentsQueryKey, shipmentRequests.getAll)

    return paginatedShipmentQuery
}

export const ShipmentQueryKey = (trackingId: string) => [ShipmentsQueryKey, trackingId]

export const useShipment = (trackingId?: string) => useQuery(ShipmentQueryKey(trackingId), () => shipmentRequests.get(trackingId), {
    enabled: !!trackingId,
    retry: false
})

export * from "./mutations"