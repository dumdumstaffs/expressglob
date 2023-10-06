import { FilterExpression } from "@api/utils/models";
import {
  FilterQueryParams,
  PaginationQueryParams,
} from "@api/utils/models/query";
import { PaginatedResponse } from "@shared/types/pagination";
import { AddressInfo, Image, Location, Shipment } from "@shared/types/shipment";
import { WithDate } from "@shared/types/transformers";
import { Model, Query, Types } from "mongoose";

// document dates
type ShipmentDates =
  | "shipDate"
  | "scheduledDate"
  | "arrivalDate"
  | "createdAt"
  | "updatedAt";

// document instance
export interface ShipmentDocument extends WithDate<Shipment, ShipmentDates> {}

// document overrides
interface ShipmentOverrides {
  shipper: Types.Subdocument<null> & AddressInfo;
  receiver: Types.Subdocument<null> & AddressInfo;
  locations: Types.DocumentArray<ShipmentLocationDocument>;
  images: Types.DocumentArray<ShipmentImageDocument>;
}

// query helpers
interface ShipmentQueryHelpers {
  filter(
    query: FilterQueryParams,
    fields: FilterExpression<ShipmentDocument>,
  ): Query<ShipmentDocument[], ShipmentDocument> & ShipmentQueryHelpers;

  paginate(
    query: PaginationQueryParams,
  ): Promise<PaginatedResponse<InstanceType<ShipmentModel>>>;
}

// static methods
export interface ShipmentModel
  extends Model<ShipmentDocument, ShipmentQueryHelpers, ShipmentOverrides> {}

// nested fields
export type ShipmentLocationDocument = WithDate<Location, "date">;
export type ShipmentImageDocument = Image;
export type ShipmentAddressInfoDocument = AddressInfo;
