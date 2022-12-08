import Button from "@/components/Button"
import Spinner from "@/components/Spinner"
import { APP_NAME } from "@/data/constants"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState } from "react"

type State = {
    loading: boolean,
    error: null | string,
    trackingId: string
}

export const Track = () => {
    const [state, setState] = useState<State>({ loading: false, error: null, trackingId: "" })

    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!state.trackingId || state.trackingId.length < 6) return setState({ ...state, error: "Please enter a valid Tracking ID" })

        setState({ ...state, loading: true })

        const redirect = () => router.push({
            pathname: "/track",
            query: { trackingId: state.trackingId }
        })

        setTimeout(redirect, 3000)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, error: null, trackingId: e.target.value })
    }

    return (
        <div
            className="fxg-app-container fxg-app--active"
            role="tabpanel"
            id="cubeTwoPar-tab"
        >
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                <div className="tracking_app_v1 appBaseComponent aem-GridColumn aem-GridColumn--default--12">
                    <div className="fxg-wrapper fxg-app__wrapper">
                        {/* SINGLE TRACKING APP */}
                        <div className="fxg-app__single-tracking">
                            <div className="fxg-app__form-wrapper fxg-tracking-app__state1">
                                <form
                                    className="fxg-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="fxg-field">
                                        <input
                                            type="text"
                                            name="trackingnumber"
                                            id="trackingnumber"
                                            className="fxg-field__input-text fxg-field__input--required"
                                            required
                                            title={`Enter a ${APP_NAME.full} tracking number to review shipping details.`}
                                            aria-required="true"
                                            value={state.trackingId}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="trackingnumber" />
                                        <span className="fxg-u-sronly">
                                            "Enter a {APP_NAME.full} tracking number to review
                                            shipping details."
                                        </span>
                                        <span
                                            className="fxg-field__placeholder fxg-field__floating-placeholder"
                                            style={{ color: state.error ? "red" : undefined }}
                                        >
                                            {state.error || "Tracking ID"}
                                        </span>
                                    </div>
                                    <Button loading={state.loading}>Track</Button>
                                </form>
                                <div className="fxg-tracking-app__links-par">
                                    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                        <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
                                            <div className="link">
                                                {/* Link in not using New FDL and Using Target  */}
                                                {/* Link in not using New FDL and Not Using Target  */}
                                                <a
                                                    href="#"
                                                    aria-label="View Watch List"
                                                    title="View Watch List"
                                                    target="_self"
                                                    className="fxg-link  js-fxgc-init  default   watchlist-webcomponent      "
                                                    data-analytics="link|VIEW WATCH LIST"
                                                    // onclick="FDX.DTM.pushLinkInfo(this)"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    VIEW WATCH LIST
                                                </a>{" "}
                                                <span
                                                    className="fxg-link__separator watchlist-webcomponent   "
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    {" "}
                                                    |{" "}
                                                </span>
                                                <input
                                                    type="hidden"
                                                    defaultValue='<div class="alert alert-danger">Image is not internal. Cannot convert SVG to code.</div>'
                                                    id="fxg-externalIconPath"
                                                />
                                            </div>
                                        </div>
                                        <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
                                            <div className="link    ">
                                                {/* Link in not using New FDL and Using Target  */}
                                                {/* Link in not using New FDL and Not Using Target  */}
                                                <a
                                                    href="quick-help/tracking/f_quickhelp.html"
                                                    aria-label="Need Help?"
                                                    target="_blank"
                                                    className="fxg-link  js-fxgc-init  default         "
                                                    data-analytics="link|NEED HELP?"
                                                    // onclick="FDX.DTM.pushLinkInfo(this)"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    NEED HELP?
                                                </a>
                                                <input
                                                    type="hidden"
                                                    defaultValue='<div class="alert alert-danger">Image is not internal. Cannot convert SVG to code.</div>'
                                                    id="fxg-externalIconPath"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fxg-tracking-app__results fxg-tracking-app__state2">
                                <div
                                    className="fxg-tracking-app__results-data"
                                    id="trk-module-div"
                                />
                                <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                    <div className="featured_offer_v2 aem-GridColumn aem-GridColumn--default--12">
                                        {/* kaltura Clientlib Includes */}
                                        <link
                                            rel="stylesheet"
                                            href="/css/kalturavideopicker.css"
                                            type="text/css"
                                        />
                                        {/* Featured offer */}
                                        {/* CHANGE: VMLNAFEDEXW-925 Updated component to support videos. Fixed some other minor bugs */}
                                        <div className="fxg-wrapper fxg-featured-offer-wrapper   ">
                                            {/* LAYOUT 1: IMAGE ON RIGHT */}
                                            <div
                                                className="fxg-featured-offer fxg-featured-offer-layout-one layout1"
                                                style={{ backgroundColor: "#FAFAFA" }}
                                            >
                                                {/* Mobile only image */}
                                                <div className="fxg-featured-offer__detail">
                                                    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                                        <div className="title_v1 aem-GridColumn aem-GridColumn--default--12">
                                                            <h2 className="fxg-title fxg-title--default     ">
                                                                Personalize Your Deliveries
                                                            </h2>
                                                        </div>
                                                        <div className="richtext parbase aem-GridColumn aem-GridColumn--default--12">
                                                            {/* CHANGE: VMLNAFEDEXW-356 Added expressions to deal with Viewport Settings */}
                                                            <input
                                                                id="justifyRteRtl"
                                                                type="hidden"
                                                                defaultValue="false"
                                                            />
                                                            <div
                                                                className="fxg-rte      "
                                                                style={{ color: "" }}
                                                                data-emptytext="Rich Text"
                                                            >
                                                                <p>
                                                                    Need to customize this delivery?
                                                                    <br /> Learn how {APP_NAME.full} Delivery
                                                                    Manager<sup>®</sup> can help ensure
                                                                    your deliveries meet your schedule -
                                                                    not the other way.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href="https://www.fedex.com/apps/fdmenrollment/"
                                                        target="_self"
                                                        className="fxg-link fxg-link--rounded_button "
                                                        data-analytics="foc|Get Started"
                                                    // onclick="FDX.DTM.pushLinkInfo(this)"
                                                    >
                                                        Get Started
                                                    </a>
                                                </div>
                                                <div
                                                    className="fxg-featured-offer__detail-image "
                                                    data-mobile-alt="Woman receiving package delivery at home"
                                                    data-main-alt="Woman receiving package delivery at home"
                                                >
                                                    <img
                                                        src="/images/delivery_driver_home_express_shipping_1511023269.jpg"
                                                        className="fxg-image"
                                                        width="100%"
                                                        height="100%"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                        alt="Woman receiving package delivery at home"
                                                    />
                                                </div>
                                                <div style={{ clear: "both" }} />
                                            </div>
                                        </div>
                                        {/* End Featured offer */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END SINGLE TRACKING APP */}
                        {/* MULTIPLE TRACKING APP */}
                        <div className="fxg-tracking-app__multi-tracking">
                            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                <div className="title_v1 aem-GridColumn aem-GridColumn--default--12">
                                    <h2 className="fxg-title fxg-title--default center    ">
                                        Enter up to 30 {APP_NAME.full} tracking numbers
                                    </h2>
                                </div>
                            </div>
                            <form
                                className="fxg-form"
                                method="POST"
                                action="#"
                                id="HomeMultiTrackingApp"
                            >
                                <div className="row fxg-form__row">
                                    <div className="fxg-field fxg-field--full">
                                        <input
                                            type="text"
                                            name="trackingnumber[]"
                                            id="trackingnumber[]"
                                            className="fxg-field__input-text fxg-field__input-text--numbered fxg-field__input--required"
                                            defaultValue=""
                                            // autofocus=""
                                            required
                                            aria-label="hero|MultiTrack 1"
                                            data-errmsg="Please enter at least one tracking number."
                                        />
                                        <span className="fxg-field__placeholder fxg-field__floating-placeholder">
                                            TRACKING NUMBER 01
                                        </span>
                                    </div>
                                </div>
                                <div className="row fxg-form__row">
                                    <div className="fxg-field fxg-field--full">
                                        <input
                                            type="text"
                                            name="trackingnumber[]"
                                            id="trackingnumber[]"
                                            className="fxg-field__input-text fxg-field__input-text--numbered"
                                            defaultValue=""
                                            required
                                            aria-label="hero|MultiTrack 2"
                                        />
                                        <span className="fxg-field__placeholder fxg-field__floating-placeholder">
                                            TRACKING NUMBER 02
                                        </span>
                                    </div>
                                </div>
                                <div className="row fxg-form__row">
                                    <div className="fxg-field fxg-field--full">
                                        <label
                                            htmlFor="trackingnumber[]"
                                            style={{ display: "none" }}
                                        />
                                        <input
                                            type="text"
                                            name="trackingnumber[]"
                                            id="trackingnumber[]"
                                            className="fxg-field__input-text fxg-field__input-text--numbered"
                                            defaultValue=""
                                            required
                                            aria-label="hero|MultiTrack 3"
                                        />
                                        <span className="fxg-field__placeholder fxg-field__floating-placeholder">
                                            TRACKING NUMBER 03
                                        </span>
                                    </div>
                                </div>
                                <div className="row fxg-form__row fxg-form__footer-row">
                                    <div className="fxg-col col-sm-4 col-sm-push-8">
                                        <button
                                            type="submit"
                                            className="fxg-button fxg-button--orange fxg-button--float-right"
                                            aria-label="Click your to track your package"
                                            id="btnMultiTrack"
                                            data-analytics="hero|MultiTrack"
                                        // target="_blank"
                                        >
                                            Track
                                        </button>
                                    </div>
                                    <div className="fxg-col col-sm-8 col-sm-pull-4">
                                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                            <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
                                                <div className="link    ">
                                                    {/* Link in not using New FDL and Using Target  */}
                                                    {/* Link in not using New FDL and Not Using Target  */}
                                                    <a
                                                        href="#"
                                                        aria-label="Single Tracking Numbers"
                                                        target="_self"
                                                        className="fxg-link  js-fxgc-init        fxg-link--carrot   "
                                                        data-analytics="link|SINGLE TRACKING NUMBER"
                                                        // onclick="FDX.TRACKING.showSingleTracking();"
                                                        style={{ color: "inherit" }}
                                                    >
                                                        SINGLE TRACKING NUMBER
                                                    </a>
                                                    <input
                                                        type="hidden"
                                                        defaultValue='<div class="alert alert-danger">Image is not internal. Cannot convert SVG to code.</div>'
                                                        id="fxg-externalIconPath"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* END MULTIPLE TRACKING APP */}
                    </div>
                </div>
            </div>
        </div>
    )
}