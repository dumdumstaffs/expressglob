import {
  ModelPaginatedCollection,
  ModelResource,
  ModelSubdocumentCollection,
  ModelSubDocumentResource,
} from "@api/utils/models";
import { AddressInfo, Image, Location, Shipment } from "@shared/types/shipment";
import {
  ShipmentAddressInfoDocument,
  ShipmentDocument,
  ShipmentImageDocument,
  ShipmentLocationDocument,
  ShipmentModel,
} from "./types";

export class ShipmentResource extends ModelResource<
  Shipment,
  ShipmentDocument,
  ShipmentModel
> {
  protected transform(): Shipment {
    return {
      id: this._doc.id,
      trackingId: this._doc.trackingId,
      desc: this._doc.desc,
      shipper: this._doc.shipper,
      receiver: this._doc.receiver,
      status: this._doc.status,
      shipDate: this._doc.shipDate.toJSON(),
      scheduledDate: this._doc.scheduledDate.toJSON(),
      arrivalDate: this._doc.arrivalDate?.toJSON(),
      weight: this._doc.weight,
      dimensions: this._doc.dimensions,
      service: this._doc.service,
      signature: this._doc.signature,
      locations: new ShipmentLocationCollection(this._doc.locations).toJSON(),
      images: new ShipmentImageCollection(this._doc.images).toJSON(),
      createdAt: this._doc.createdAt.toJSON(),
      updatedAt: this._doc.updatedAt.toJSON(),
    };
  }
}

export class ShipmentPaginatedCollection extends ModelPaginatedCollection<
  Shipment,
  ShipmentDocument,
  ShipmentModel
> {
  protected transform() {
    return this._paginatedDocs.data.map((doc) =>
      new ShipmentResource(doc).toJSON(),
    );
  }
}

// Subdocuments

export class ShipmentLocationResource extends ModelSubDocumentResource<
  Location,
  ShipmentLocationDocument
> {
  protected transform(): Location {
    return {
      id: this._doc.id,
      address: this._doc.address,
      comment: this._doc.comment,
      date: this._doc.date.toJSON(),
    };
  }
}

export class ShipmentLocationCollection extends ModelSubdocumentCollection<
  Location,
  ShipmentLocationDocument
> {
  protected transform() {
    return this._docs.map((doc) => new ShipmentLocationResource(doc).toJSON());
  }
}

export class ShipmentImageResource extends ModelSubDocumentResource<
  Image,
  ShipmentImageDocument
> {
  protected transform(): Image {
    return {
      id: this._doc.id,
      url: this._doc.url,
      cloudId: this._doc.cloudId,
    };
  }
}

export class ShipmentImageCollection extends ModelSubdocumentCollection<
  Image,
  ShipmentImageDocument
> {
  protected transform() {
    return this._docs.map((doc) => new ShipmentImageResource(doc).toJSON());
  }
}

export class ShipmentAddressInfoResource extends ModelSubDocumentResource<
  AddressInfo,
  ShipmentAddressInfoDocument,
  null
> {
  protected transform(): AddressInfo {
    return {
      name: this._doc.name,
      address: this._doc.address,
      phone: this._doc.phone,
      streetAddress: this._doc.streetAddress,
      company: this._doc.company,
      email: this._doc.email,
    };
  }
}
