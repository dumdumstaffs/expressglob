import { request } from "@/lib/axios"
import { PaginatedResponse } from "@/types"
import { Image, Location, Shipment } from "@/types/shipment"
import { ShipmentCreateDto, ShipmentPushImageDto, ShipmentPushLocationDto, ShipmentUpdateDto, ShipmentUpdateLocationDto } from "@/schemas/shipment"

export const ShipmentRequests = {
    async getAll(page: number) {
        const { data } = await request.get<PaginatedResponse<Shipment>>("/api/shipments", {
            params: { page }
        })

        return data
    },

    async create(shipmentData: ShipmentCreateDto) {
        const { data } = await request.post<Shipment>("/api/shipments", shipmentData)

        return data
    },

    async get(trackingId: string) {
        const { data } = await request.get<Shipment>(`/api/shipments/${trackingId}`)

        return data
    },

    async update(trackingId: string, shipmentData: ShipmentUpdateDto) {
        const { data } = await request.put<Shipment>(`/api/shipments/${trackingId}`, shipmentData)

        return data
    },

    async pushLocation(trackingId: string, locationData: ShipmentPushLocationDto) {
        const { data } = await request.post<Location>(`/api/shipments/${trackingId}/locations`, locationData)

        return data
    },

    async updateLocation(trackingId: string, locationId: string, locationData: ShipmentUpdateLocationDto) {
        const { data } = await request.put<Location>(`/api/shipments/${trackingId}/locations/${locationId}`, locationData)

        return data
    },

    async removeLocation(trackingId: string, locationId: string) {
        await request.delete(`/api/shipments/${trackingId}/locations/${locationId}`)
    },

    async pushImage(trackingId: string, imageData: ShipmentPushImageDto) {
        const { data } = await request.post<Image>(`/api/shipments/${trackingId}/images`, imageData)

        return data
    },

    async removeImage(trackingId: string, imageId: string) {
        await request.delete(`/api/shipments/${trackingId}/images/${imageId}`)
    }
}