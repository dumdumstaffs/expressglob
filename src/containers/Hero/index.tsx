import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { TabSelector } from "./partials/TabSelector";
import { Wrapper } from "./partials/Wrapper";
import { Ship, Track, Location } from "./partials/tabs";

import { Tab } from "./types";

const hasTabInUrl = (urlTab: string | string[]): urlTab is Tab => {
    if (urlTab === "ship" || urlTab === "track" || urlTab === "location") return true
    return false
}

export default function Hero() {
    const router = useRouter()
    const { tab: urlTab } = router.query

    const [activeTab, setActiveTab] = useState<Tab>("track")

    const changeTab = (tab: Tab) => {
        if (activeTab === tab) return

        setActiveTab(tab)
        router.replace(`?tab=${tab}`, undefined, { shallow: true })
    }

    useEffect(() => {
        if (hasTabInUrl(urlTab)) setActiveTab(urlTab)
    }, [!!urlTab])

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
            {activeTab === "ship" ? <Ship /> : activeTab === "location" ? <Location /> : <Track />}
            {/* HERO APP CONTAINERS END */}
        </Wrapper>
    )
}