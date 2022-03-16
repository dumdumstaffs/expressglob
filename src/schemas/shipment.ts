import * as yup from "yup"
import { Location, Shipment } from "@/types/shipment"
import { WithDate } from "@/types"

export default class ShipmentSchema {
    public static create: yup.SchemaOf<ShipmentCreateDtoWithDate> = yup.object({
        desc: yup.string().required(),

        shipperName: yup.string().required(),
        shipperStreetAddress: yup.string().required(),
        shipperAddress: yup.string().required(),
        shipperPhone: yup.string().required(),
        shipperEmail: yup.string().email(),
        shipperCompany: yup.string(),

        receiverName: yup.string().required(),
        receiverStreetAddress: yup.string().required(),
        receiverAddress: yup.string().required(),
        receiverPhone: yup.string().required(),
        receiverEmail: yup.string().email(),
        receiverCompany: yup.string(),

        shipDate: yup.date().required(),
        scheduledDate: yup.date().required(),

        weight: yup.string().required(),
        dimensions: yup.string().required(),
        service: yup.string().required(),
        signature: yup.boolean().required(),
    })

    private static statusOptions: ShipmentUpdateDto["status"][] = ["initiated", "pickedUp", "inTransit", "delivered"]

    public static update: yup.SchemaOf<ShipmentUpdateDtoWithDate> = ShipmentSchema.create.shape({
        status: yup.mixed<ShipmentUpdateDto["status"]>().required().oneOf(ShipmentSchema.statusOptions),

        arrivalDate: yup.date().nullable(),
    })

    public static pushLocation: yup.SchemaOf<ShipmentPushLocationDtoWithDate> = yup.object({
        date: yup.date().required(),
        address: yup.string().required(),
        comment: yup.string().required()
    })

    public static updateLocation: yup.SchemaOf<ShipmentUpdateLocationDtoWithDate> = ShipmentSchema.pushLocation.shape({})

    public static pushImage: yup.SchemaOf<ShipmentPushImageDto> = yup.object({
        cloudId: yup.string().required(),
        url: yup.string().required()
    })
}

export interface ShipmentCreateDto {
    desc: Shipment["desc"]
    shipperName: Shipment["shipper"]["name"]
    shipperStreetAddress: Shipment["shipper"]["streetAddress"]
    shipperAddress: Shipment["shipper"]["address"]
    shipperPhone: Shipment["shipper"]["phone"]
    shipperEmail?: Shipment["shipper"]["email"]
    shipperCompany?: Shipment["shipper"]["company"]
    receiverName: Shipment["receiver"]["name"]
    receiverStreetAddress: Shipment["receiver"]["streetAddress"]
    receiverAddress: Shipment["receiver"]["address"]
    receiverPhone: Shipment["receiver"]["phone"]
    receiverEmail?: Shipment["receiver"]["email"]
    receiverCompany?: Shipment["receiver"]["company"]
    shipDate: Shipment["shipDate"]
    scheduledDate: Shipment["scheduledDate"]
    weight: Shipment["weight"]
    dimensions: Shipment["dimensions"]
    service: Shipment["service"]
    signature: Shipment["signature"]
}
export type ShipmentCreateDtoWithDate = WithDate<ShipmentCreateDto, "shipDate" | "scheduledDate">

export interface ShipmentUpdateDto extends ShipmentCreateDto {
    status: Shipment["status"]
    arrivalDate?: Shipment["arrivalDate"]
}
export type ShipmentUpdateDtoWithDate = WithDate<ShipmentUpdateDto, "shipDate" | "scheduledDate" | "arrivalDate">


export interface ShipmentPushLocationDto extends Omit<Location, "id"> { }
export type ShipmentPushLocationDtoWithDate = WithDate<ShipmentPushLocationDto, "date">

export interface ShipmentUpdateLocationDto extends Omit<Location, "id"> { }
export type ShipmentUpdateLocationDtoWithDate = WithDate<ShipmentUpdateLocationDto, "date">

export interface ShipmentPushImageDto {
    cloudId: string
    url: string
}