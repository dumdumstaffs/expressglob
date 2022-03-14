import { Shipment, Location, AddressInfo } from "@/types/shipment";
import { ModelResource, ModelPaginatedCollection, ModelSubDocumentResource, ModelSubdocumentCollection } from "@/utils/models";
import { ShipmentAddressInfoDocument, ShipmentDocument, ShipmentLocationDocument, ShipmentModel } from "./types";

export class ShipmentResource extends ModelResource<Shipment, ShipmentDocument, ShipmentModel> {

    protected transform(): Shipment {
        const ppp = this._doc.locations[0]
        return {
            id: this._doc.id,
            trackingId: this._doc.trackingId,
            desc: this._doc.desc,
            shipper: new ShipmentAddressInfoResource(this._doc.shipper).toJSON(),
            receiver: new ShipmentAddressInfoResource(this._doc.receiver).toJSON(),
            status: this._doc.status,
            shipDate: this._doc.shipDate.toJSON(),
            scheduledDate: this._doc.scheduledDate.toJSON(),
            arrivalDate: this._doc.arrivalDate.toJSON(),
            weight: this._doc.weight,
            dimensions: this._doc.dimensions,
            service: this._doc.service,
            signature: this._doc.signature,
            locations: new ShipmentLocationResourceCollection(this._doc.locations).toJSON(),
            createdAt: this._doc.createdAt.toJSON(),
            updatedAt: this._doc.updatedAt.toJSON(),
        }
    }
}

export class ShipmentPaginatedCollection extends ModelPaginatedCollection<Shipment, ShipmentDocument, ShipmentModel> {
    protected transform() {
        return this._paginatedDocs.data.map(doc => new ShipmentResource(doc).toJSON())
    }
}

// Subdocuments

export class ShipmentLocationResource extends ModelSubDocumentResource<Location, ShipmentLocationDocument> {

    public transform(): Location {
        return {
            id: this._doc.id,
            address: this._doc.address,
            comment: this._doc.comment,
            date: this._doc.date.toJSON(),
        }
    }
}

export class ShipmentLocationResourceCollection extends ModelSubdocumentCollection<Location, ShipmentLocationDocument> {
    protected transform() {
        return this._docs.map(doc => new ShipmentLocationResource(doc).toJSON())
    }
}

export class ShipmentAddressInfoResource extends ModelSubDocumentResource<AddressInfo, ShipmentAddressInfoDocument, null> {

    public transform(): AddressInfo {
        return {
            name: this._doc.name,
            address: this._doc.address,
            phone: this._doc.phone,
            streetAddress: this._doc.streetAddress,
            company: this._doc.company,
            email: this._doc.email
        }
    }
}