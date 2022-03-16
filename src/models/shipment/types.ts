import { NextApiRequest } from "next"
import { Model, Query, Types } from "mongoose"
import { FilterExpression } from "@/utils/models"
import { PaginatedResponse, WithDate } from "@/types"
import { AddressInfo, Image, Location, Shipment } from "@/types/shipment"

// document dates
type ShipmentDates = "shipDate" | "scheduledDate" | "arrivalDate" | "createdAt" | "updatedAt"

// document instance
export interface ShipmentDocument extends WithDate<Shipment, ShipmentDates> { }

// document overrides
interface ShipmentOverrides {
    shipper: Types.Subdocument<null> & AddressInfo
    receiver: Types.Subdocument<null> & AddressInfo
    locations: Types.DocumentArray<ShipmentLocationDocument>
    images: Types.DocumentArray<ShipmentImageDocument>
}

// query helpers
interface ShipmentQueryHelpers {
    filter(
        req: NextApiRequest,
        fields: FilterExpression<ShipmentDocument>
    ): Query<ShipmentDocument[], ShipmentDocument> & ShipmentQueryHelpers

    paginate(req: NextApiRequest): Promise<PaginatedResponse<InstanceType<ShipmentModel>>>
}

// static methods
export interface ShipmentModel extends Model<ShipmentDocument, ShipmentQueryHelpers, ShipmentOverrides> { }

// nested fields
export type ShipmentLocationDocument = WithDate<Location, "date">
export type ShipmentImageDocument = Image
export type ShipmentAddressInfoDocument = AddressInfo