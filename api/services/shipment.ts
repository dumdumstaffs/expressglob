import {
  Shipment,
  ShipmentImageResource,
  ShipmentLocationResource,
  ShipmentPaginatedCollection,
  ShipmentResource,
} from "@api/models/shipment";
import { MediaService } from "@api/services/media";
import { PaginationQueryParams } from "@api/utils/models/query";
import ShipmentSchema from "@shared/schemas/shipment";
import { customAlphabet } from "nanoid";
import { z } from "zod";

export class ShipmentService {
  constructor(private readonly mediaService: MediaService) {}

  public async getAll(page: PaginationQueryParams) {
    const shipments = await Shipment.find().sort("-createdAt").paginate(page);

    return new ShipmentPaginatedCollection(shipments);
  }

  public async findById(id: string) {
    const shipment = await Shipment.findById(id);
    if (!shipment) return null;

    return new ShipmentResource(shipment);
  }

  public async findByTrackingid(trackingId: string) {
    const shipment = await Shipment.findOne({ trackingId });
    if (!shipment) return null;

    return new ShipmentResource(shipment);
  }

  public async create(shipmentData: z.infer<typeof ShipmentSchema.create>) {
    const trackingId = customAlphabet("0123456789", 12)();

    const shipment = await Shipment.create({
      trackingId,
      desc: shipmentData.desc,
      shipper: {
        name: shipmentData.shipperName,
        streetAddress: shipmentData.shipperStreetAddress,
        address: shipmentData.shipperAddress,
        phone: shipmentData.shipperPhone,
        email: shipmentData.shipperEmail,
        company: shipmentData.shipperCompany,
      },
      receiver: {
        name: shipmentData.receiverName,
        streetAddress: shipmentData.receiverStreetAddress,
        address: shipmentData.receiverAddress,
        phone: shipmentData.receiverPhone,
        email: shipmentData.receiverEmail,
        company: shipmentData.receiverCompany,
      },
      shipDate: shipmentData.shipDate,
      scheduledDate: shipmentData.scheduledDate,
      weight: shipmentData.weight,
      dimensions: shipmentData.dimensions,
      service: shipmentData.service,
      signature: shipmentData.signature,
    });

    return new ShipmentResource(shipment);
  }

  public async update(
    trackingId: string,
    shipmentData: z.infer<typeof ShipmentSchema.update>,
  ) {
    const shipment = await Shipment.findOneAndUpdate(
      { trackingId },
      {
        desc: shipmentData.desc,
        status: shipmentData.status,
        shipper: {
          name: shipmentData.shipperName,
          streetAddress: shipmentData.shipperStreetAddress,
          address: shipmentData.shipperAddress,
          phone: shipmentData.shipperPhone,
          email: shipmentData.shipperEmail,
          company: shipmentData.shipperCompany,
        },
        receiver: {
          name: shipmentData.receiverName,
          streetAddress: shipmentData.receiverStreetAddress,
          address: shipmentData.receiverAddress,
          phone: shipmentData.receiverPhone,
          email: shipmentData.receiverEmail,
          company: shipmentData.receiverCompany,
        },
        shipDate: shipmentData.shipDate,
        scheduledDate: shipmentData.scheduledDate,
        arrivalDate: shipmentData.arrivalDate,
        weight: shipmentData.weight,
        dimensions: shipmentData.dimensions,
        service: shipmentData.service,
        signature: shipmentData.signature,
      },
      {
        new: true,
      },
    );
    if (!shipment) return null;

    return new ShipmentResource(shipment);
  }

  public async pushLocation(
    trackingId: string,
    locationData: z.infer<typeof ShipmentSchema.pushLocation>,
  ) {
    const shipment = await this.findByTrackingid(trackingId);
    if (!shipment) return null;

    const shipmentDocument = shipment.raw();

    const location = shipmentDocument.locations.create(locationData);
    shipmentDocument.locations.unshift(location);

    await shipmentDocument.save();

    return new ShipmentLocationResource(location);
  }

  public async updateLocation(
    trackingId: string,
    locationId: string,
    locationData: z.infer<typeof ShipmentSchema.updateLocation>,
  ) {
    const shipment = await this.findByTrackingid(trackingId);
    if (!shipment) return null;

    const shipmentDocument = shipment.raw();

    const location = shipmentDocument.locations.id(locationId);
    if (!location) return null;

    location.set(locationData);

    await shipmentDocument.save();

    return new ShipmentLocationResource(location);
  }

  public async deleteLocation(trackingId: string, locationId: string) {
    const shipment = await this.findByTrackingid(trackingId);
    if (!shipment) return null;

    const shipmentDocument = shipment.raw();

    const location = shipmentDocument.locations.id(locationId);
    if (!location) return null;

    location.remove();

    await shipmentDocument.save();
    return new ShipmentLocationResource(location);
  }

  public async pushImage(
    trackingId: string,
    imageData: z.infer<typeof ShipmentSchema.pushImage>,
  ) {
    const shipment = await this.findByTrackingid(trackingId);
    if (!shipment) return null;

    const shipmentDocument = shipment.raw();

    const image = shipmentDocument.images.create(imageData);
    shipmentDocument.images.push(image);

    await shipmentDocument.save();

    return new ShipmentImageResource(image);
  }

  public async deleteImage(trackingId: string, imageId: string) {
    const shipment = await this.findByTrackingid(trackingId);
    if (!shipment) return null;

    const shipmentDocument = shipment.raw();

    const image = shipmentDocument.images.id(imageId);
    if (!image) return null;

    await this.mediaService.destroy(image.cloudId);

    image.remove();

    await shipmentDocument.save();
    return new ShipmentImageResource(image);
  }
}
