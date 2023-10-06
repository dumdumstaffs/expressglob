"use client";

import { useEffect, useState } from "react";

import { Location, Ship, Track } from "./partials/tabs";
import { TabSelector } from "./partials/TabSelector";
import { Wrapper } from "./partials/Wrapper";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tab } from "./types";

const hasTabInUrl = (urlTab: string | null | undefined): urlTab is Tab => {
  return urlTab === "ship" || urlTab === "track" || urlTab === "location";
};

export default function Hero() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTab = searchParams?.get("tab");
  const [activeTab, setActiveTab] = useState<Tab>("track");

  const changeTab = (tab: Tab) => {
    if (activeTab === tab) return;

    setActiveTab(tab);
    pathname && router.replace(pathname + "?" + new URLSearchParams({ tab }));
  };

  useEffect(() => {
    if (hasTabInUrl(urlTab)) setActiveTab(urlTab);
  }, [urlTab]);

  return (
    <Wrapper>
      {/* HERO HEADER START */}
      <div className="fxg-hero__header">
        <h1
          className="fxg-supscript"
          style={{ textAlign: "center", color: "#FFFFFF" }}
        >
          Ship, manage, track, deliver
        </h1>
        <TabSelector activeTab={activeTab} handleChange={changeTab} />
      </div>
      {/* HERO HEADER END */}
      {/* HERO APP CONTAINERS START */}
      {activeTab === "ship" ? (
        <Ship />
      ) : activeTab === "location" ? (
        <Location />
      ) : (
        <Track />
      )}
      {/* HERO APP CONTAINERS END */}
    </Wrapper>
  );
}
