import { proxy, useSnapshot } from "valtio";

export type Tab = "shipping" | "tracking" | "design" | "locations" | "support"

type Store = {
    sidebarOpen: boolean,
    searchOpen: boolean,
    userbarOpen: boolean,
    activeTab: Tab | null
}

export const Store = proxy<Store>({
    sidebarOpen: false,
    searchOpen: false,
    userbarOpen: false,
    activeTab: null
})

export const Controller = {
    // sidebar
    closeAll: () => {
        Store.sidebarOpen = false
        Store.userbarOpen = false
        Store.activeTab = null
    },
    toggleSidebar: () => {
        Store.sidebarOpen = !Store.sidebarOpen
        Store.activeTab = null
        Store.userbarOpen = false
    },

    //tab
    toggleTab: (tab: Tab, closeIfActive?: boolean) => {
        if (Store.activeTab === tab) {
            // tab is already active
            Store.activeTab = null
            if (closeIfActive) Store.sidebarOpen = false
        } else if (Store.sidebarOpen) {
            // another tab is active
            Store.activeTab = tab
            if (Store.userbarOpen) Store.userbarOpen = false
        } else {
            // no tab is active
            Store.sidebarOpen = true
            Store.activeTab = tab
            if (Store.userbarOpen) Store.userbarOpen = false
        }
    },

    // search
    toggleSearch: () => Store.searchOpen = !Store.searchOpen,

    // userbar
    toggleUserbar: () => {
        Store.userbarOpen = !Store.userbarOpen
        if (Store.sidebarOpen) {
            Store.sidebarOpen = false
            Store.activeTab = null
        }
    }
}

export const useStore = () => useSnapshot(Store)