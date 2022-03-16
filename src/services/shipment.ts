import { NextApiRequest } from "next"
import { customAlphabet } from "nanoid"
import { Inject } from "@/utils/di"
import { AppError } from "@/utils/error"
import MediaService from "@/services/media"
import { Shipment, ShipmentResource, ShipmentLocationResource, ShipmentPaginatedCollection, ShipmentImageResource } from "@/models/shipment"
import { ShipmentCreateDtoWithDate, ShipmentUpdateDtoWithDate, ShipmentPushLocationDtoWithDate, ShipmentUpdateLocationDtoWithDate, ShipmentPushImageDto } from "@/schemas/shipment"

@Inject()
export default class ShipmentService {
    constructor(private readonly mediaService: MediaService) { }

    public async getAll(req: NextApiRequest) {
        const shipments = await Shipment.find().sort("-createdAt").paginate(req)

        return new ShipmentPaginatedCollection(shipments)
    }

    public async findByIdOrFail(id: string) {
        const shipment = await Shipment.findById(id)
        if (!shipment) throw new AppError("Shipment not found", AppError.ErrorCodes.NotFound)

        return new ShipmentResource(shipment)
    }

    public async findOrFail(trackingId: string) {
        const shipment = await Shipment.findOne({ trackingId })
        if (!shipment) throw new AppError("Shipment not found", AppError.ErrorCodes.NotFound)

        return new ShipmentResource(shipment)
    }

    public async create(S: ShipmentCreateDtoWithDate) {
        const trackingId = customAlphabet("0123456789", 12)()

        const shipment = await Shipment.create({
            trackingId,
            desc: S.desc,
            shipper: {
                name: S.shipperName,
                streetAddress: S.shipperStreetAddress,
                address: S.shipperAddress,
                phone: S.shipperPhone,
                email: S.shipperEmail,
                company: S.shipperCompany
            },
            receiver: {
                name: S.receiverName,
                streetAddress: S.receiverStreetAddress,
                address: S.receiverAddress,
                phone: S.receiverPhone,
                email: S.receiverEmail,
                company: S.receiverCompany
            },
            shipDate: S.shipDate,
            scheduledDate: S.scheduledDate,
            weight: S.weight,
            dimensions: S.dimensions,
            service: S.service,
            signature: S.signature,
        })

        return new ShipmentResource(shipment)
    }

    public async update(trackingId: string, S: ShipmentUpdateDtoWithDate) {
        const shipment = await Shipment.findOneAndUpdate({ trackingId }, {
            desc: S.desc,
            status: S.status,
            shipper: {
                name: S.shipperName,
                streetAddress: S.shipperStreetAddress,
                address: S.shipperAddress,
                phone: S.shipperPhone,
                email: S.shipperEmail,
                company: S.shipperCompany
            },
            receiver: {
                name: S.receiverName,
                streetAddress: S.receiverStreetAddress,
                address: S.receiverAddress,
                phone: S.receiverPhone,
                email: S.receiverEmail,
                company: S.receiverCompany
            },
            shipDate: S.shipDate,
            scheduledDate: S.scheduledDate,
            arrivalDate: S.arrivalDate,
            weight: S.weight,
            dimensions: S.dimensions,
            service: S.service,
            signature: S.signature,
        }, {
            new: true
        })
        if (!shipment) throw new AppError("Shipment not found", AppError.ErrorCodes.NotFound)

        return new ShipmentResource(shipment)
    }

    public async pushLocation(trackingId: string, L: ShipmentPushLocationDtoWithDate) {
        const shipment = await this.findOrFail(trackingId)
        const shipmentDocument = shipment.raw()

        const location = shipmentDocument.locations.create(L)
        shipmentDocument.locations.unshift(location)

        await shipmentDocument.save()

        return new ShipmentLocationResource(location)
    }

    public async updateLocation(trackingId: string, locationId: string, L: ShipmentUpdateLocationDtoWithDate) {
        const shipment = await this.findOrFail(trackingId)
        const shipmentDocument = shipment.raw()

        const location = shipmentDocument.locations.id(locationId)
        if (!location) throw new AppError("Shipment not found", AppError.ErrorCodes.NotFound)

        location.set(L)

        await shipmentDocument.save()

        return new ShipmentLocationResource(location)
    }

    public async deleteLocation(trackingId: string, locationId: string) {
        const shipment = await this.findOrFail(trackingId)
        const shipmentDocument = shipment.raw()

        const location = shipmentDocument.locations.id(locationId)
        if (!location) throw new AppError("Shipment Location not found", AppError.ErrorCodes.NotFound)

        location.remove()

        await shipmentDocument.save()
    }

    public async pushImage(trackingId: string, imageData: ShipmentPushImageDto) {
        const shipment = await this.findOrFail(trackingId)
        const shipmentDocument = shipment.raw()

        const image = shipmentDocument.images.create(imageData)
        shipmentDocument.images.push(image)

        await shipmentDocument.save()

        return new ShipmentImageResource(image)
    }

    public async deleteImage(trackingId: string, imageId: string) {
        const shipment = await this.findOrFail(trackingId)
        const shipmentDocument = shipment.raw()

        const image = shipmentDocument.images.id(imageId)
        if (!image) throw new AppError("Shipment Image not found", AppError.ErrorCodes.NotFound)

        await this.mediaService.destroy(image.cloudId)

        image.remove()

        await shipmentDocument.save()
    }
}
