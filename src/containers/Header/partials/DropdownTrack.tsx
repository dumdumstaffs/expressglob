import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/router"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { DropdownSubMenuFooter, DropdownSubMenuItem } from "./DropdownSubMenu"
import { Controller, Tab, useStore } from "../store"
import { APP_NAME } from "@/data/constants"

type Props = {
    tab: Tab
}

type State = {
    error: null | string,
    trackingId: string
}

export const DropdownTrack = ({ tab }: Props) => {
    const { activeTab } = useStore()

    const smallScreen = useMediaQuery("(max-width: 992px)")

    const [state, setState] = useState<State>({ error: null, trackingId: "" })

    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!state.trackingId || state.trackingId.length < 6) return setState({ ...state, error: "Please enter a valid Tracking ID" })

        Controller.toggleSidebar()

        router.push({
            pathname: "/track",
            query: { trackingId: state.trackingId }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, error: null, trackingId: e.target.value })
    }

    return (
        <div className="dropdown aem-GridColumn aem-GridColumn--default--12">
            {/* DROPDOWN START */}
            <ul className="fxg-dropdown__list">
                <li className={`fxg-dropdown__item ${activeTab === tab ? "fxg-dropdown__item--open" : ""}`}>
                    <a
                        href="#"
                        aria-label="Open Tracking Menu"
                        className="fxg-link fxg-dropdown-js "
                        target="_self"
                        onClick={() => Controller.toggleTab(tab, !smallScreen)}
                    >
                        <span className="fxg-mouse" tabIndex={-1}>
                            Tracking
                        </span>
                    </a>
                    <div className="fxg-dropdown__sub-menu">
                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                            <div className="tracking_module_v1 aem-GridColumn aem-GridColumn--default--12">
                                <div className="fxg-tracking-module">
                                    <form
                                        className="fxg-form"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="fxg-field">
                                            <label
                                                htmlFor="trackingModuleTrackingNum"
                                                style={{ display: "none" }}
                                            >
                                                Tracking ID
                                            </label>
                                            <input
                                                id="trackingModuleTrackingNum"
                                                tabIndex={0}
                                                type="text"
                                                className="fxg-field__input-text fxg-field__input--required"
                                                name="trackingNumber"
                                                required
                                                title={`Enter a ${APP_NAME.full} tracking number to review shipping details.`}
                                                aria-required="true"
                                                value={state.trackingId}
                                                onChange={handleChange}
                                            />
                                            <span className="fxg-field__placeholder fxg-field__floating-placeholder">
                                                Tracking ID
                                            </span>
                                        </div>
                                        <button
                                            type="submit"
                                            aria-label="Click here to track your package"
                                            className="fxg-button fxg-button--orange"
                                            data-analytics="hdr|Tracking|button|Track"
                                        >
                                            TRACK
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <DropdownSubMenuItem title="Advanced Shipment Tracking" href="/tracking" />
                            <DropdownSubMenuItem title="Manage Your Delivery" href="/fdmenrollment" />

                            <DropdownSubMenuFooter title="ALL TRACKING SERVICES" href="/tracking" />
                        </div>
                    </div>
                </li>
            </ul>
            {/* DROPDOWN END */}
        </div>
    )
}