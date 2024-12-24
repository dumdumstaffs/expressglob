import Button from "@web/components/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type State = {
  loading: boolean;
  error: null | string;
  trackingId: string;
};

export const Track = () => {
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    trackingId: "",
  });

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.trackingId || state.trackingId.length < 6)
      return setState({ ...state, error: "Please enter a valid Tracking ID" });

    setState({ ...state, loading: true });

    const redirect = () =>
      router.push(
        "/track" + "?" + new URLSearchParams({ trackingId: state.trackingId }),
      );

    setTimeout(redirect, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, error: null, trackingId: e.target.value });
  };

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
                <form className="fxg-form" onSubmit={handleSubmit}>
                  <div className="fxg-field">
                    <input
                      type="text"
                      name="trackingnumber"
                      id="trackingnumber"
                      className="fxg-field__input-text fxg-field__input--required"
                      required
                      title="Enter a ExpressGlob tracking number to review shipping details."
                      aria-required="true"
                      value={state.trackingId}
                      onChange={handleChange}
                    />
                    <label htmlFor="trackingnumber" />
                    <span className="fxg-u-sronly">
                      {`"Enter a ExpressGlob tracking number to review shipping
                      details."`}
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
            </div>
            {/* END SINGLE TRACKING APP */}
            {/* MULTIPLE TRACKING APP */}
            <div className="fxg-tracking-app__multi-tracking">
              <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                <div className="title_v1 aem-GridColumn aem-GridColumn--default--12">
                  <h2 className="fxg-title fxg-title--default center    ">
                    Enter up to 30 ExpressGlob tracking numbers
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
  );
};
