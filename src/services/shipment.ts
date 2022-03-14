import { NextApiRequest } from "next"
import { NotFound } from "http-errors"
import { customAlphabet } from "nanoid"
import { Inject } from "@/utils/di"
import { Shipment, ShipmentResource, ShipmentLocationResource, ShipmentPaginatedCollection } from "@/models/shipment"
import { ShipmentCreateDtoWithDate, ShipmentUpdateDtoWithDate, ShipmentPushLocationDtoWithDate, ShipmentUpdateLocationDtoWithDate } from "@/schemas/shipment"

@Inject()
export default class ShipmentService {
    public async getAll(req: NextApiRequest) {
        const shipments = await Shipment.find().sort("-createdAt").paginate(req)

        return new ShipmentPaginatedCollection(shipments)
    }

    public async findByIdOrFail(id: string) {
        const shipment = await Shipment.findById(id)
        if (!shipment) throw new NotFound("Shipment not found")

        return new ShipmentResource(shipment)
    }

    public async findOrFail(trackingId: string) {
        const shipment = await Shipment.findOne({ trackingId })
        if (!shipment) throw new NotFound("Shipment not found")

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
        if (!shipment) throw new NotFound("Shipment not found")

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
        if (!location) throw new NotFound("Shipment Location not found")

        location.set(L)

        await shipmentDocument.save()

        return new ShipmentLocationResource(location)
    }

    public async deleteLocation(trackingId: string, locationId: string) {
        const shipment = await this.findOrFail(trackingId)
        const shipmentDocument = shipment.raw()

        const location = shipmentDocument.locations.id(locationId)
        if (!location) throw new NotFound("Shipment Location not found")

        location.remove()

        await shipmentDocument.save()
    }
}
