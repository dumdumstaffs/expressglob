import { useEffect } from "react"
import { useRouter } from "next/router"
import { Loader } from "@/components/Loader"
import TabLink from "@/components/TabLink"
import ParcelBody from "@/components/ParcelBody"
import ParcelNotFound from "@/components/ParcelNotFound"
import ParcelHistory from "@/components/ParcelHistory"
import ParcelFacts from "@/components/ParcelFacts"
import { TrackNew } from "@/containers/TrackNew"
import { useShipment } from "@/queries/shipments"
import { TrackingNav } from "./partials/TrackingNav"
import { Controller, useStore } from "./store"

export default function TrackSuite() {
    const store = useStore()

    const router = useRouter()
    const { trackingId } = router.query

    const shipment = useShipment(trackingId as string | undefined)

    useEffect(() => {
        if (!router.isReady) return

        if (!router.query.trackingId) Controller.toggleTrackNew()

    }, [router])

    return (
        <>
            <TrackingNav />
            {store.trackNew && <TrackNew url="/track" onTrack={Controller.toggleTrackNew} />}
            {
                shipment.isLoading ? (
                    <Loader />
                ) : shipment.isError ? (
                    <ParcelNotFound />
                ) : shipment.isSuccess ? (
                    <div className="w-full">
                        <ParcelBody shipment={shipment.data} />

                        <div className="mt-16 sm:mt-8 sm:mx-4">
                            <div className="mx-2 flex items-center justify-start">
                                <TabLink label="Travel History" active={store.tab === "history"} onClick={() => Controller.setTab("history")} />
                                <TabLink label="Shipment Facts" active={store.tab === "facts"} onClick={() => Controller.setTab("facts")} />
                            </div>
                            {store.tab === "history" && <ParcelHistory shipment={shipment.data} />}
                            {store.tab === "facts" && <ParcelFacts shipment={shipment.data} />}
                        </div>
                    </div>
                ) : null
            }

        </>
    )
}