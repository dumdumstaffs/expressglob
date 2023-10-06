import { trpc } from "@web/api/trpc";
import { Loader } from "@web/components/Loader";
import ParcelBody from "@web/components/ParcelBody";
import ParcelFacts from "@web/components/ParcelFacts";
import ParcelHistory from "@web/components/ParcelHistory";
import ParcelNotFound from "@web/components/ParcelNotFound";
import TabLink from "@web/components/TabLink";
import { TrackNew } from "@web/containers/TrackNew";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PushImages } from "./partials/PushImages";
import { PushLocation } from "./partials/PushLocation";
import { TrackingNav } from "./partials/TrackingNav";
import { UpdateLocation } from "./partials/UpdateLocation";
import { UpdateParcel } from "./partials/UpdateParcel";
import { Controller, useStore } from "./store";

export default function AdminSuite() {
  const store = useStore();
  const searchParams = useSearchParams();
  const trackingId = searchParams?.get("trackingId");

  const shipment = trpc.shipment.getOne.useQuery(
    {
      trackingId: trackingId!,
    },
    {
      enabled: !!trackingId,
    },
  );

  useEffect(() => {
    if (!trackingId) Controller.toggleTrackNew();
  }, [trackingId]);

  return (
    <>
      <TrackingNav />
      {store.trackNew && (
        <TrackNew url="/manager/track" onTrack={Controller.toggleTrackNew} />
      )}
      {shipment.isLoading ? (
        <Loader />
      ) : shipment.isError ? (
        <ParcelNotFound />
      ) : shipment.isSuccess ? (
        <div className="w-full">
          <ParcelBody shipment={shipment.data} />

          <div className="mt-16 sm:mt-8 sm:mx-4">
            <div className="mx-2 flex items-center justify-start">
              <TabLink
                label="Travel History"
                active={store.tab === "history"}
                onClick={() => Controller.setTab("history")}
              />
              <TabLink
                label="Shipment Facts"
                active={store.tab === "facts"}
                onClick={() => Controller.setTab("facts")}
              />
              {store.tab === "pushLocation" ? (
                <TabLink
                  label="Add Location"
                  active={store.tab === "pushLocation"}
                  onClick={() => Controller.setTab("pushLocation")}
                />
              ) : store.tab === "updateLocation" ? (
                <TabLink
                  label="Update Location"
                  active={store.tab === "updateLocation"}
                  onClick={() => {}}
                />
              ) : store.tab === "images" ? (
                <TabLink
                  label="Manage Images"
                  active={store.tab === "images"}
                  onClick={() => {}}
                />
              ) : (
                <TabLink
                  label="Update"
                  active={store.tab === "update"}
                  onClick={() => Controller.setTab("update")}
                />
              )}
            </div>
            {store.tab === "history" && (
              <ParcelHistory
                shipment={shipment.data}
                onLocation={Controller.toggleUpdateLocation}
              />
            )}
            {store.tab === "facts" && <ParcelFacts shipment={shipment.data} />}
            {store.tab === "update" && (
              <UpdateParcel shipment={shipment.data} />
            )}
            {store.tab === "pushLocation" && (
              <PushLocation shipment={shipment.data} />
            )}
            {store.tab === "updateLocation" && store.locationId && (
              <UpdateLocation
                shipment={shipment.data}
                locationId={store.locationId}
              />
            )}
            {store.tab === "images" && <PushImages shipment={shipment.data} />}
          </div>
        </div>
      ) : null}
    </>
  );
}
