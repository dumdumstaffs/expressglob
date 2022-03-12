import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { Loader, LoaderError } from "@/components/Loader";
import { parseService, parseStatus } from "@/utils/shipment";
import { useShipment } from "@/queries/shipments";

export default function Invoice() {
    const [printed, setPrinted] = useState(false)

    const router = useRouter()
    const { trackingId } = router.query

    const shipment = useShipment(trackingId as string | undefined)

    useEffect(() => {
        if (!shipment.isSuccess) return

        const print = setTimeout(() => {
            if (!printed) window.print()
            setPrinted(true)
        }, 500)

        return () => {
            clearTimeout(print)
        }

    }, [shipment])

    if (shipment.isLoading) return <Loader />
    if (shipment.isError) return <LoaderError message="Package not found" />

    if (shipment.isSuccess) return (
        <div className="bg-gray-100 p-4">
            <div className="max-w-xl mx-auto print:max-w-none p-4 bg-white print-main">
                <div className="mb-6">
                    <Image src="/images/plain-logo.png" width={85.33} height={48} />
                </div>

                <div className="space-y-4 mb-4">
                    <h3 className="text-xs m-0">{format(new Date(shipment.data.shipDate), "MMMM MM, yyyy")}</h3>
                    <h3 className="text-xs m-0">Dear Customer,</h3>
                    <p className="text-xs m-0">The following is the invoice for the package number <b>{shipment.data.trackingId}</b></p>
                </div>

                <Heading title="Delivery Information" />
                <div className="">
                    <div className="grid grid-cols-4">
                        <div className="">
                            <Bold>Status:</Bold>
                        </div>
                        <div className="">
                            <Small>{parseStatus(shipment.data.status)}</Small>
                        </div>
                        <div className="">
                            <Bold>Delivery Location:</Bold>
                        </div>
                        <div className="">
                            <Caps>{shipment.data.receiver.address}</Caps>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mt-4">
                        <div className="">
                            <Bold>Signed for by:</Bold>
                            <Bold>Service type:</Bold>
                            <Bold>Special Handling</Bold>
                        </div>
                        <div className="">
                            <Caps>{shipment.data.shipper.name}</Caps>
                            <Small>{parseService(shipment.data.service)?.desc}</Small>
                            <Small>{parseService(shipment.data.service)?.routines}</Small>
                        </div>
                        <div className="">
                            <Bold>Delivery Date:</Bold>
                        </div>
                        <div className="">
                            <Small>{format(new Date(shipment.data.scheduledDate), "MMM d, yyyy HH:mm")}</Small>
                        </div>
                    </div>
                </div>

                <p className="text-xs m-0 my-12">
                    Signature image is available in order to view image and detailed information, the shipper or payor account number of the shipment must be provided
                </p>

                <Heading title="Shipping Information" />
                <div className="">
                    <div className="grid grid-cols-4">
                        <div className="">
                            <Bold>Tracking Number:</Bold>
                        </div>
                        <div className="">
                            <Small>{shipment.data.trackingId}</Small>
                            <p></p>
                        </div>
                        <div className="">
                            <Bold>Ship Date:</Bold>
                        </div>
                        <div className="">
                            <Small>{format(new Date(shipment.data.shipDate), "MMM d, yyyy")}</Small>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mt-4">
                        <div className="">
                            <Bold>Recipient:</Bold>
                            <Caps>{shipment.data.receiver.name}</Caps>
                            <Caps>{shipment.data.receiver.address}</Caps>
                        </div>
                        <div className="">
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <div className="">
                            <Bold>Shipper:</Bold>
                            <Caps>{shipment.data.shipper.name}</Caps>
                            <Caps>{shipment.data.shipper.address}</Caps>
                        </div>
                        <div className="">
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>

                <p className="text-xs m-0 my-12">
                    Thank you for choosing FedEx.
                </p>
            </div>
        </div>
    )

    return null
}

const Heading = ({ title }: { title: string }) => (
    <div className="border-0 border-t-2 border-b-2 border-solid mb-1">
        <h2 className="text-xs font-bold m-0 pl-2 pt-1">{title}</h2>
    </div>
)

const Bold = ({ children }) => (
    <h4 className="text-xs m-0 font-bold">{children}</h4>
)

const Small = ({ children }) => (
    <h4 className="text-xs m-0">{children}</h4>
)

const Caps = ({ children }) => (
    <h4 className="text-xs m-0 uppercase">{children}</h4>
)