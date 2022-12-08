import { APP_NAME } from "@/data/constants"
import { FooterLink } from "./partials/FooterLink"
import { SocialLink } from "./partials/SocialLink"

export default function Footer() {
    return (
        <div className="experiencefragment_1 HFexperiencefragment">
            <div className="cmp-experiencefragment cmp-experiencefragment--footer">
                <div className="xf-content-height">
                    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                        <div className="footer aem-GridColumn aem-GridColumn--default--12">
                            {/* FOOTER COMPONENT */}
                            <input id="footerIconRtl" type="hidden" defaultValue="false" />
                            <footer className="fxg-footer   ">
                                <div className="fxg-footer__primary">
                                    <div className="fxg-wrapper container">
                                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                            <div className="column_control_v1 aem-GridColumn aem-GridColumn--default--12">
                                                {/* COLUMN CONTROL START */}
                                                <div className="row" style={{ backgroundColor: "" }}>
                                                    {/* 4 Columns */}
                                                    <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-4">
                                                        <div style={{ backgroundColor: "" }}>
                                                            <div className="title_v1 section">
                                                                <div className="fxg-title fxg-title--default     ">
                                                                    Our Company
                                                                </div>
                                                            </div>
                                                            <div className="column_control_v1 section">
                                                                {/* COLUMN CONTROL START */}
                                                                <div
                                                                    className="row"
                                                                    style={{ backgroundColor: "" }}
                                                                >
                                                                    {/* 2 Columns */}
                                                                    <div
                                                                        className="fxg-col col-sm-6">
                                                                        <div style={{ backgroundColor: "" }}>
                                                                            <FooterLink title={`About ${APP_NAME.full}`} href="/about" />
                                                                            <FooterLink title="Our Portfolio" href="/about/company-structure" />
                                                                            <FooterLink title="Investor Relations" href="/about/investors" />
                                                                            <FooterLink title="Careers" href="/about/careers" />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="fxg-col col-sm-6">
                                                                        <div style={{ backgroundColor: "" }}>
                                                                            <FooterLink title={`${APP_NAME.full} Blog`} href="/blog" />
                                                                            <FooterLink title="Corporate Responsibility" href="/about/corporate-social-responsibility" />
                                                                            <FooterLink title="Newsroom" href="/newsroom" />
                                                                            <FooterLink title="Contact Us" href="/contact-us" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* COLUMN CONTROL END */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-3">
                                                        <div style={{ backgroundColor: "" }}>
                                                            <div className="title_v1 section">
                                                                <div className="fxg-title fxg-title--default left    ">
                                                                    More From {APP_NAME.full}
                                                                </div>
                                                            </div>
                                                            <FooterLink title={`${APP_NAME.full} Compatible`} href="/compatible" />
                                                            <FooterLink title={`${APP_NAME.full} Developer Portal`} href="/developers" />
                                                            <FooterLink title={`${APP_NAME.full} Logistics`} href="/logistics" />
                                                            <FooterLink title={`${APP_NAME.full} Cross Border`} href="/cross-border" />
                                                            <FooterLink title="ShopRunner" href="/shoprunner" />
                                                        </div>
                                                    </div>
                                                    <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-2">
                                                        <div style={{ backgroundColor: "" }}></div>
                                                    </div>
                                                    <div
                                                        className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-3">
                                                        <div style={{ backgroundColor: "" }}>
                                                            <div className="title_v1 section">
                                                                <div className="fxg-title fxg-title--default left    ">
                                                                    Language
                                                                </div>
                                                            </div>
                                                            <div className="languagenavigation_v1 section">
                                                                {/* LANGUAGE DROPDOWN START */}
                                                                <div className="icon_link parbase">
                                                                    <a
                                                                        href="#"
                                                                        target="_self"
                                                                        className="fxg-link  "
                                                                    >
                                                                        <img
                                                                            src="/images/resources/sprite-placeholder.png"
                                                                            alt="United States"
                                                                            width="100%"
                                                                            height="100%"
                                                                            className="fxg-icon fxg-icon--flag-default fxg-icon--flag-us"
                                                                        />
                                                                        <span className="fxg-link" style={{ marginLeft: "4px", display: "inline" }}>United States</span>

                                                                    </a>
                                                                </div>
                                                                {/*Bootstrap dropdown for uniformity across all OS's*/}
                                                                <div
                                                                    className="dropdown fxg-bootstrap-dropdown   "
                                                                    style={{ float: "none" }}
                                                                >
                                                                    <button
                                                                        className="dropdown-toggle"
                                                                        type="button"
                                                                        id="dropdownMenu"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                        aria-label="Please select language from below drop down"
                                                                    >
                                                                        English
                                                                        <span className="fxg-icon" />
                                                                    </button>
                                                                    <ul
                                                                        className="dropdown-menu"
                                                                        aria-labelledby="dropdownMenu"
                                                                    >
                                                                        <li>
                                                                            <a href="#" target="_self">
                                                                                English
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                {/* LANGUAGE DROPDOWN END */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* COLUMN CONTROL END */}
                                            </div>
                                            <div className="hr_v1 aem-GridColumn aem-GridColumn--default--12">
                                                <hr aria-hidden="true" className="  fxg-mobile--hide" />
                                            </div>
                                            <div className="column_control_v1 aem-GridColumn aem-GridColumn--default--12">
                                                {/* COLUMN CONTROL START */}
                                                <div className="row" style={{ backgroundColor: "" }}>
                                                    {/* 2 Columns */}
                                                    <div className="fxg-col">
                                                        <div style={{ backgroundColor: "" }}></div>
                                                    </div>
                                                    <div className="fxg-col">
                                                        <div style={{ backgroundColor: "" }}></div>
                                                    </div>
                                                </div>
                                                {/* COLUMN CONTROL END */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fxg-footer__social">
                                    <div className="fxg-wrapper container">
                                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                            <div className="column_control_v1 aem-GridColumn aem-GridColumn--default--12">
                                                {/* COLUMN CONTROL START */}
                                                <div className="row" style={{ backgroundColor: "" }}>
                                                    {/* 2 Columns */}
                                                    <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-10">
                                                        <div style={{ backgroundColor: "" }}>
                                                            <div className="title_v1 section">
                                                                <span className="fxg-title fxg-title--default left    ">
                                                                    Follow {APP_NAME.full}
                                                                </span>
                                                            </div>
                                                            <SocialLink href="#" iconName="email" label="Newsletter Signup" />
                                                            <SocialLink href="#" iconName="facebook" label={`${APP_NAME.full} on Facebook`} />
                                                            <SocialLink href="#" iconName="twitter" label={`${APP_NAME.full} on Twitter`} />
                                                            <SocialLink href="#" iconName="instagram" label={`${APP_NAME.full} on Instagram`} />
                                                            <SocialLink href="#" iconName="linkedin" label={`${APP_NAME.full} on LinkedIn`} />
                                                            <SocialLink href="#" iconName="youtube" label={`${APP_NAME.full} on YouTube`} />
                                                            <SocialLink href="#" iconName="pinterest" label={`${APP_NAME.full} on Pinterest`} />
                                                        </div>
                                                    </div>
                                                    <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-2">
                                                        <div style={{ backgroundColor: "" }}></div>
                                                    </div>
                                                </div>
                                                {/* COLUMN CONTROL END */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fxg-copyright">
                                    <div className="fxg-wrapper container">
                                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                            <div className="column_control_v1 aem-GridColumn aem-GridColumn--default--12">
                                                {/* COLUMN CONTROL START */}
                                                <div className="row" style={{ backgroundColor: "" }}>
                                                    {/* 2 Columns */}
                                                    <div className="fxg-col col-sm-4">
                                                        <div style={{ backgroundColor: "" }}>
                                                            <div className="title_v1 section">
                                                                <div className="fxg-title fxg-title--default     ">
                                                                    © {APP_NAME.full} 1995-{new Date().getFullYear()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="fxg-col col-sm-8">
                                                        <div style={{ backgroundColor: "" }}>
                                                            <div className="column_control_v1 section">
                                                                {/* COLUMN CONTROL START */}
                                                                <div
                                                                    className="row"
                                                                    style={{ backgroundColor: "" }}
                                                                >
                                                                    {/* 2 Columns */}
                                                                    <div className="fxg-col">
                                                                        <div style={{ backgroundColor: "" }}></div>
                                                                    </div>
                                                                    <div className="fxg-col ">
                                                                        <div style={{ backgroundColor: "" }}>
                                                                            <div className="button_v1 section">
                                                                                <div className="link    ">
                                                                                    {/* Link in not using New FDL and Using Target  */}
                                                                                    {/* Link in not using New FDL and Not Using Target  */}
                                                                                    <a
                                                                                        // href="sitemap.html"
                                                                                        aria-label="Site Map"
                                                                                        title="Site Map"
                                                                                        target="_self"
                                                                                        className="fxg-link  js-fxgc-init  default         "
                                                                                        style={{ color: "inherit" }}
                                                                                    >
                                                                                        <span className="fxg-mouse" tabIndex={-1}>Site Map</span>
                                                                                    </a>{" "}
                                                                                    <span
                                                                                        className="fxg-link__separator    "
                                                                                        style={{ color: "inherit" }}
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
                                                                            <div className="button_v1 section">
                                                                                <div className="link    ">
                                                                                    {/* Link in not using New FDL and Using Target  */}
                                                                                    {/* Link in not using New FDL and Not Using Target  */}
                                                                                    <a
                                                                                        href="/terms-of-use"
                                                                                        aria-label="Terms of Use"
                                                                                        title="Terms of Use"
                                                                                        target="_self"
                                                                                        className="fxg-link  js-fxgc-init  default         "
                                                                                        style={{ color: "inherit" }}
                                                                                    >
                                                                                        <span className="fxg-mouse" tabIndex={-1}>Terms of Use</span>
                                                                                    </a>{" "}
                                                                                    <span
                                                                                        className="fxg-link__separator    "
                                                                                        style={{ color: "inherit" }}
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
                                                                            <div className="button_v1 section">
                                                                                <div className="link    ">
                                                                                    {/* Link in not using New FDL and Using Target  */}
                                                                                    {/* Link in not using New FDL and Not Using Target  */}
                                                                                    <a
                                                                                        href="/trust-center"
                                                                                        aria-label="Privacy & Security"
                                                                                        title="Privacy & Security"
                                                                                        target="_self"
                                                                                        className="fxg-link  js-fxgc-init  default         "
                                                                                        style={{ color: "inherit" }}
                                                                                    >
                                                                                        <span className="fxg-mouse" tabIndex={-1}>Privacy &amp; Security</span>
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
                                                                {/* COLUMN CONTROL END */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* COLUMN CONTROL END */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                            {/* END FOOTER COMPONENT */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}