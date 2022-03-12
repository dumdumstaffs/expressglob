import { format } from "date-fns"
import { Shipment } from "@/types/shipment"
import { parseService, shippingServices } from "@/utils/shipment"
import Link from "next/link"

const ParcelFacts = ({ shipment }: { shipment: Shipment }) => {
    return (
        <div className="grid grid-cols-2 px-2 sm:px-0 sm:grid-cols-3 gap-x-2 gap-y-4 my-12">
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Tracking Number</h4>
                <p className="font-thin">{shipment.trackingId}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Service</h4>
                <p className="font-thin">{parseService(shipment.service)?.desc}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Weight</h4>
                <p className="font-thin">{shipment.weight}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Dimensions</h4>
                <p className="font-thin">{shipment.dimensions}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Clearance Detail Link</h4>
                <a className="font-bold underline text-xs">CLEARANCE DETAIL</a>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Terms</h4>
                <p className="font-thin">Third Party</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">{parseService(shipment.service)?.desc || shippingServices[0].desc}</h4>
                <p className="font-thin">{parseService(shipment.service)?.routines || shippingServices[0].routines}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Standard Transist</h4>
                <p className="font-thin">{format(new Date(shipment.shipDate), "dd/MM/yyyy 'by' HH:mm")}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Ship Date</h4>
                <p className="font-thin">{format(new Date(shipment.shipDate), "EEE dd/MM/yyyy")}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Actual Delivery</h4>
                <p className="font-thin">{shipment.arrivalDate ? format(new Date(shipment.shipDate), "EEE dd/MM/yyyy HH:mm") : "Not Delivered"}</p>
            </div>
            <div className="">
                <h4 className="font-bold uppercase tracking-wide">Download Invoice</h4>
                <Link href={`/invoice/${shipment.trackingId}`}>
                    <a className="font-bold underline text-xs">SHIPPING INVOICE</a>
                </Link>
            </div>
        </div>
    )
}

export default ParcelFacts