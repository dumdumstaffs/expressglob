import { proxy, useSnapshot } from "valtio";

type Store = {
  trackNew: boolean;
  tab: "history" | "facts";
};

export const Store = proxy<Store>({
  trackNew: false,
  tab: "history",
});

export const Controller = {
  toggleTrackNew() {
    Store.trackNew = !Store.trackNew;
  },

  setTab(tab: Store["tab"]) {
    Store.tab = tab;
  },
};

export const useStore = () => useSnapshot(Store);
