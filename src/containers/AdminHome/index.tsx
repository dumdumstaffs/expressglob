import { useEffect } from "react"
import { useRouter } from "next/router"
import TabLink from "@/components/TabLink"
import { TrackNew } from "@/containers/TrackNew"
import { arrayIncludes } from "@/utils/helpers"
import { TrackingNav } from "./partials/TrackingNav"
import { CreateAdmin } from "./partials/CreateAdmin"
import { ParcelList } from "./partials/ParcelList"
import { CreateParcel } from "./partials/CreateParcel"
import { AdminList } from "./partials/AdminList"
import { Controller, useStore } from "./store"

export default function AdminHome() {
    const store = useStore()

    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return

        if (arrayIncludes(router.query.tab, ["shipments", "newShipment"] as const)) {
            Controller.setTab(router.query.tab)
            router.replace({
                query: undefined
            })
        }

    }, [router])

    return (
        <>
            <TrackingNav />
            {store.trackNew && <TrackNew url="/manager/track" onTrack={Controller.toggleTrackNew} />}
            {store.createAdmin && <CreateAdmin />}

            <div className="w-full">
                <div className="text-center mt-12 mx-auto w-full sm:w-8/12">
                    <div>
                        <h3 className="text-2xl sm:text-4xl m-0 mb-2 font-light">Welcome, User</h3>
                    </div>

                    <a className="block mb-10 uppercase text-sm font-bold tracking-widest mt-4">
                        What would you like to do?
                    </a>

                    <div className="bg-fedex-bg text-gray-800 text-sm pl-14 pr-4 py-4 text-left relative">
                        <p className="absolute top-4 left-6 border-solid border rounded-full w-5 h-5 text-sm font-bold text-center">i</p>
                        View all Shipments or Create a new Shipment
                    </div>
                </div>

                <div className="mt-16 sm:mt-12 sm:mx-4">
                    <div className="mx-2 flex items-center justify-start">
                        <TabLink label="All Shipments" active={store.tab === "shipments"} onClick={() => Controller.setTab("shipments")} />
                        <TabLink label="New Shipment" active={store.tab === "newShipment"} onClick={() => Controller.setTab("newShipment")} />
                        <TabLink label="All Admins" active={store.tab === "admins"} onClick={() => Controller.setTab("admins")} />
                    </div>
                    {store.tab === "shipments" && <ParcelList />}
                    {store.tab === "newShipment" && <CreateParcel />}
                    {store.tab === "admins" && <AdminList />}

                </div>
            </div>
        </>
    )
}