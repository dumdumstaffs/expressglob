import { FooterLink } from "./partials/FooterLink";
import { SocialLink } from "./partials/SocialLink";

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
                        <div className="row" style={{}}>
                          {/* 4 Columns */}
                          <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-4">
                            <div style={{}}>
                              <div className="title_v1 section">
                                <div className="fxg-title fxg-title--default     ">
                                  Our Company
                                </div>
                              </div>
                              <div className="column_control_v1 section">
                                {/* COLUMN CONTROL START */}
                                <div className="row" style={{}}>
                                  {/* 2 Columns */}
                                  <div className="fxg-col col-sm-6">
                                    <div style={{}}>
                                      <FooterLink
                                        title="About ModernExpress"
                                        href="/about"
                                      />
                                      <FooterLink
                                        title="Our Portfolio"
                                        href="/about/company-structure"
                                      />
                                      <FooterLink
                                        title="Investor Relations"
                                        href="/about/investors"
                                      />
                                      <FooterLink
                                        title="Careers"
                                        href="/about/careers"
                                      />
                                    </div>
                                  </div>
                                  <div className="fxg-col col-sm-6">
                                    <div style={{}}>
                                      <FooterLink
                                        title="ModernExpress Blog"
                                        href="/blog"
                                      />
                                      <FooterLink
                                        title="Corporate Responsibility"
                                        href="/about/corporate-social-responsibility"
                                      />
                                      <FooterLink
                                        title="Newsroom"
                                        href="/newsroom"
                                      />
                                      <FooterLink
                                        title="Contact Us"
                                        href="/contact-us"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* COLUMN CONTROL END */}
                              </div>
                            </div>
                          </div>
                          <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-3">
                            <div style={{}}>
                              <div className="title_v1 section">
                                <div className="fxg-title fxg-title--default left    ">
                                  More From ModernExpress
                                </div>
                              </div>
                              <FooterLink
                                title="ModernExpress Compatible"
                                href="/compatible"
                              />
                              <FooterLink
                                title="ModernExpress Developer Portal"
                                href="/developers"
                              />
                              <FooterLink
                                title="ModernExpress Logistics"
                                href="/logistics"
                              />
                              <FooterLink
                                title="ModernExpress Cross Border"
                                href="/cross-border"
                              />
                              <FooterLink
                                title="ShopRunner"
                                href="/shoprunner"
                              />
                            </div>
                          </div>
                          <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-2">
                            <div style={{}}></div>
                          </div>
                          <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-3">
                            <div style={{}}>
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
                                    <span
                                      className="fxg-link"
                                      style={{
                                        marginLeft: "4px",
                                        display: "inline",
                                      }}
                                    >
                                      United States
                                    </span>
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
                        <div className="row" style={{}}>
                          {/* 2 Columns */}
                          <div className="fxg-col">
                            <div style={{}}></div>
                          </div>
                          <div className="fxg-col">
                            <div style={{}}></div>
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
                        <div className="row" style={{}}>
                          {/* 2 Columns */}
                          <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-10">
                            <div style={{}}>
                              <div className="title_v1 section">
                                <span className="fxg-title fxg-title--default left    ">
                                  Follow ModernExpress
                                </span>
                              </div>
                              <SocialLink
                                iconName="email"
                                label="Newsletter Signup"
                              />
                              <SocialLink
                                iconName="facebook"
                                label="ModernExpress on Facebook"
                              />
                              <SocialLink
                                iconName="twitter"
                                label="ModernExpress on Twitter"
                              />
                              <SocialLink
                                iconName="instagram"
                                label="ModernExpress on Instagram"
                              />
                              <SocialLink
                                iconName="linkedin"
                                label="ModernExpress on LinkedIn"
                              />
                              <SocialLink
                                iconName="youtube"
                                label="ModernExpress on YouTube"
                              />
                              <SocialLink
                                iconName="pinterest"
                                label="ModernExpress on Pinterest"
                              />
                            </div>
                          </div>
                          <div className="fxg-col fxg-col--mt20 fxg-col--mb20 col-sm-2">
                            <div style={{}}></div>
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
                        <div className="row" style={{}}>
                          {/* 2 Columns */}
                          <div className="fxg-col col-sm-4">
                            <div style={{}}>
                              <div className="title_v1 section">
                                <div className="fxg-title fxg-title--default     ">
                                  © ModernExpress 1995-
                                  {new Date().getFullYear()}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="fxg-col col-sm-8">
                            <div style={{}}>
                              <div className="column_control_v1 section">
                                {/* COLUMN CONTROL START */}
                                <div className="row" style={{}}>
                                  {/* 2 Columns */}
                                  <div className="fxg-col">
                                    <div style={{}}></div>
                                  </div>
                                  <div className="fxg-col ">
                                    <div style={{}}>
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
                                            <span
                                              className="fxg-mouse"
                                              tabIndex={-1}
                                            >
                                              Site Map
                                            </span>
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
                                            <span
                                              className="fxg-mouse"
                                              tabIndex={-1}
                                            >
                                              Terms of Use
                                            </span>
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
                                            <span
                                              className="fxg-mouse"
                                              tabIndex={-1}
                                            >
                                              Privacy &amp; Security
                                            </span>
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
  );
}
