import { Types } from "mongoose"
import { PaginatedResponse } from "@/types";
import { Shipment, Location } from "@/types/shipment";
import { ShipmentDocument, ShipmentModel, ShipmentLocationDocument } from "./types";

export class ShipmentResource {
    public static transform(doc: ShipmentDocument): Shipment {
        return {
            id: doc.id,
            trackingId: doc.trackingId,
            desc: doc.desc,
            shipper: doc.shipper,
            receiver: doc.receiver,
            status: doc.status,
            shipDate: doc.shipDate as unknown as string,
            scheduledDate: doc.scheduledDate as unknown as string,
            arrivalDate: doc.arrivalDate as unknown as string,
            weight: doc.weight,
            dimensions: doc.dimensions,
            service: doc.service,
            signature: doc.signature,
            locations: ShipmentLocationResource.collection(doc.locations as unknown as Types.DocumentArray<ShipmentLocationDocument>),
        }
    }

    public static collection(docs: ShipmentDocument[]): Shipment[] {
        return docs.map(ShipmentResource.transform)
    }

    public static paginate(paginatedDocs: PaginatedResponse<ShipmentDocument>): PaginatedResponse<Shipment> {
        return { ...paginatedDocs, data: ShipmentResource.collection(paginatedDocs.data) }
    }

    constructor(private readonly _doc: ShipmentDocument) { }

    public get() {
        return ShipmentResource.transform(this._doc)
    }

    public doc() {
        return this._doc
    }

    public raw() {
        return this._doc as InstanceType<ShipmentModel>
    }
}

export class ShipmentLocationResource {
    public static transform(doc: Types.Subdocument<Types.ObjectId> & ShipmentLocationDocument): Location {
        return {
            id: doc.id,
            address: doc.address,
            comment: doc.comment,
            date: doc.date as unknown as string,
        }
    }

    public static collection(docs: Types.DocumentArray<ShipmentLocationDocument>): Location[] {
        return docs.map(ShipmentLocationResource.transform)
    }

    constructor(private readonly _doc: Types.Subdocument<Types.ObjectId> & ShipmentLocationDocument) { }

    public get() {
        return ShipmentLocationResource.transform(this._doc)
    }

    public doc() {
        return this._doc
    }
}