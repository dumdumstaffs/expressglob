import mongoose from "mongoose"
import { ShipmentPlugin } from "./plugin"
import { ShipmentDocument, ShipmentModel, ShipmentAddressInfoDocument, ShipmentLocationDocument, ShipmentImageDocument } from "./types"

const AddressInfoSchema = new mongoose.Schema<ShipmentAddressInfoDocument>({
    name: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    company: {
        type: String,
        default: null
    },
}, { _id: false })

const LocationSchema = new mongoose.Schema<ShipmentLocationDocument>({
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

const ImageSchema = new mongoose.Schema<ShipmentImageDocument>({
    url: {
        type: String,
        required: true
    },
    cloudId: {
        type: String,
        required: true
    }
})

const ShipmentSchema = new mongoose.Schema<ShipmentDocument, ShipmentModel>(
    {
        trackingId: {
            type: String,
            unique: true,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        shipper: {
            type: AddressInfoSchema,
            required: true,
        },
        receiver: {
            type: AddressInfoSchema,
            required: true,
        },
        status: {
            type: String,
            enum: ["initiated", "inTransit", "awaitingPayment", "delivered"],
            default: "initiated"
        },
        shipDate: {
            type: Date,
            required: true,
        },
        scheduledDate: {
            type: Date,
            required: true,
        },
        arrivalDate: {
            type: Date,
            default: null
        },
        weight: {
            type: String,
            required: true,
        },
        dimensions: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        signature: {
            type: Boolean,
            default: false,
        },
        locations: [LocationSchema],
        images: [ImageSchema]
    },
    {
        timestamps: true
    }
)

ShipmentPlugin.plugin(ShipmentSchema)

export const Shipment = mongoose.models.Shipment as ShipmentModel || mongoose.model<ShipmentDocument, ShipmentModel>("Shipment", ShipmentSchema)

export type { ShipmentDocument, ShipmentModel } from "./types"
export {
    ShipmentResource,
    ShipmentPaginatedCollection,
    ShipmentLocationResource,
    ShipmentLocationCollection,
    ShipmentImageResource,
    ShipmentImageCollection,
    ShipmentAddressInfoResource
} from "./resource"