import { proxy, useSnapshot } from "valtio";

type Store = {
    trackNew: boolean
    tab: "history" | "facts" | "update" | "pushLocation" | "updateLocation" | "images"
    locationId?: string
}

type Omy = Store["tab"]

export const Store = proxy<Store>({
    trackNew: false,
    tab: "history",
    locationId: null
})

export const Controller = {
    toggleTrackNew() {
        Store.trackNew = !Store.trackNew
    },

    setTab(tab: "history" | "facts" | "update" | "pushLocation" | "images") {
        Store.tab = tab
    },

    toggleUpdateLocation(locationId: string) {
        Store.tab = "updateLocation"
        Store.locationId = locationId
    }
}

export const useStore = () => useSnapshot(Store)