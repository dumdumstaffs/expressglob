"use client";

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
import { TrackingNav } from "./partials/TrackingNav";
import { Controller, useStore } from "./store";

export default function TrackSuite() {
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
        <TrackNew url="/track" onTrack={Controller.toggleTrackNew} />
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
            </div>
            {store.tab === "history" && (
              <ParcelHistory shipment={shipment.data} />
            )}
            {store.tab === "facts" && <ParcelFacts shipment={shipment.data} />}
          </div>
        </div>
      ) : null}
    </>
  );
}
