import { proxy, useSnapshot } from "valtio";

type Store = {
  trackNew: boolean;
  createAdmin: boolean;
  tab: "shipments" | "newShipment" | "admins";
};

export const Store = proxy<Store>({
  trackNew: false,
  createAdmin: false,
  tab: "shipments",
});

export const Controller = {
  toggleTrackNew() {
    Store.trackNew = !Store.trackNew;
  },

  toggleCreateAdmin() {
    Store.createAdmin = !Store.createAdmin;
  },

  setTab(tab: Store["tab"]) {
    Store.tab = tab;
  },
};

export const useStore = () => useSnapshot(Store);
