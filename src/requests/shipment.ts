import { ShipmentCreateDto, ShipmentPushLocationDto, ShipmentUpdateDto, ShipmentUpdateLocationDto } from "@/schemas/shipment"
import { PaginatedResponse } from "@/types"
import { Location, Shipment } from "@/types/shipment"
import { request } from "."

export const getAll = async (page: number) => {
    const { data } = await request.get<PaginatedResponse<Shipment>>("/api/shipments", {
        params: { page }
    })

    return data
}

export const create = async (shipmentData: ShipmentCreateDto) => {
    const { data } = await request.post<Shipment>("/api/shipments", shipmentData)

    return data
}

export const get = async (trackingId: string) => {
    const { data } = await request.get<Shipment>(`/api/shipments/${trackingId}`)

    return data
}

export const update = async (trackingId: string, shipmentData: ShipmentUpdateDto) => {
    const { data } = await request.put<Shipment>(`/api/shipments/${trackingId}`, shipmentData)

    return data
}

export const pushLocation = async (trackingId: string, locationData: ShipmentPushLocationDto) => {
    const { data } = await request.post<Location>(`/api/shipments/${trackingId}/locations`, locationData)

    return data
}

export const updateLocation = async (trackingId: string, locationId: string, locationData: ShipmentUpdateLocationDto) => {
    const { data } = await request.put<Location>(`/api/shipments/${trackingId}/locations/${locationId}`, locationData)

    return data
}

export const removeLocation = async (trackingId: string, locationId: string) => {
    await request.delete(`/api/shipments/${trackingId}/locations/${locationId}`)
}