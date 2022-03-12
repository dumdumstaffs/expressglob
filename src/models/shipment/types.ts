import { NextApiRequest } from "next"
import { Model, Query, Types } from "mongoose"
import { FilterFields } from "@/utils/models"
import { PaginatedResponse, WithDate } from "@/types"
import { AddressInfo, Location, Shipment } from "@/types/shipment"

// document instance
export interface ShipmentDocument extends WithDate<Shipment, "shipDate" | "scheduledDate" | "arrivalDate"> { }

// document overrides
interface ShipmentOverrides {
    shipper: Types.Subdocument<Types.ObjectId> & AddressInfo
    receiver: Types.Subdocument<Types.ObjectId> & AddressInfo
    locations: Types.DocumentArray<ShipmentLocationDocument>
}

// query helpers
interface ShipmentQueryHelpers {
    filter(
        req: NextApiRequest,
        fields: FilterFields
    ): Query<ShipmentDocument[], ShipmentDocument> & ShipmentQueryHelpers

    paginate(req: NextApiRequest): Promise<PaginatedResponse<ShipmentDocument>>
}

// static methods
export interface ShipmentModel extends Model<ShipmentDocument, ShipmentQueryHelpers, ShipmentOverrides> { }

// nested fields
export type ShipmentAddressInfoDocument = AddressInfo
export type ShipmentLocationDocument = WithDate<Location, "date">