import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="hero_landingpage_v1 aem-GridColumn aem-GridColumn--default--12">
        <div className="" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="fxg-wrapper">
            <h1 className="fxg-title  fxg-supscript">Page Not Found</h1>
          </div>
        </div>
      </div>
      <div className="container responsivegrid fxg-wrapper aem-GridColumn aem-GridColumn--default--12">
        <div className="cmp-container">
          <div className="spacer">
            <div
              className="fxg-spacer fxg-spacer-hide--tablet"
              style={{ height: 30, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--desktop"
              style={{ height: 30, backgroundColor: "default" }}
            />
          </div>
          <div className="column_control_v1">
            {/* COLUMN CONTROL START */}
            <div className="row" style={{ backgroundColor: "#FAFAFA" }}>
              {/* 2 Columns */}
              <div className="fxg-col col-sm-6">
                <div style={{}}>
                  <div className="spacer section">
                    <div
                      className="fxg-spacer fxg-spacer-hide--mobile"
                      style={{ height: 15, backgroundColor: "default" }}
                    />
                    <div
                      className="fxg-spacer fxg-spacer-hide--tablet"
                      style={{ height: 25, backgroundColor: "default" }}
                    />
                    <div
                      className="fxg-spacer fxg-spacer-hide--desktop"
                      style={{ height: 25, backgroundColor: "default" }}
                    />
                  </div>
                  <div className="title_v1 section">
                    <h3
                      className="text-xl sm:p-0 lg:px-4"
                      style={{ marginTop: 0, marginBottom: 0 }}
                      id="top"
                    >
                      Here are some links you may find useful:
                    </h3>
                  </div>
                  <div className="spacer section">
                    <div
                      className="fxg-spacer"
                      style={{ height: 25, backgroundColor: "default" }}
                    />
                  </div>
                  <HelpLink title="Home" href="/home" desc="Go to Homepage" />
                  <HelpLink
                    title="Manage Delivery"
                    href="/secure/login"
                    desc="Advanced Shipment services"
                  />
                  <HelpLink
                    title="Sign Off Package"
                    href="/secure/login"
                    desc="Sign Package"
                  />
                  <HelpLink
                    title="File Claim"
                    href="/secure/login"
                    desc="Prepare Claim"
                  />
                  <div className="spacer section">
                    <div
                      className="fxg-spacer fxg-spacer-hide--tablet"
                      style={{ height: 15, backgroundColor: "default" }}
                    />
                    <div
                      className="fxg-spacer fxg-spacer-hide--desktop"
                      style={{ height: 15, backgroundColor: "default" }}
                    />
                  </div>
                </div>
              </div>
              <div className="fxg-col col-sm-6">
                <div style={{}}>
                  <div className="spacer section">
                    <div
                      className="fxg-spacer fxg-spacer-hide--tablet"
                      style={{ height: 72, backgroundColor: "default" }}
                    />
                    <div
                      className="fxg-spacer fxg-spacer-hide--desktop"
                      style={{ height: 72, backgroundColor: "default" }}
                    />
                  </div>
                  <HelpLink
                    title="Account Management Tools"
                    href="/secure/login"
                    desc="Manage Account"
                  />
                  <HelpLink
                    title="Design &amp; Print"
                    href="/secure/login"
                    desc="Explore Print, Products &amp; Design"
                  />
                  <HelpLink
                    title="Small Business"
                    href="/secure/login"
                    desc="Small Business Center"
                  />
                  <HelpLink
                    title="Enterprise"
                    href="/secure/login"
                    desc="Enterprise Tools"
                  />
                  <div className="spacer section">
                    <div
                      className="fxg-spacer fxg-spacer-hide--mobile"
                      style={{ height: 15, backgroundColor: "default" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* COLUMN CONTROL END */}
          </div>
          <div className="spacer">
            <div
              className="fxg-spacer fxg-spacer-hide--tablet"
              style={{ height: 120, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--desktop"
              style={{ height: 120, backgroundColor: "default" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const HelpLink = ({
  title,
  href,
  desc,
}: {
  title: string;
  href: string;
  desc: string;
}) => (
  <div className="column_control_v1 section">
    {/* COLUMN CONTROL START */}
    <div className="row" style={{}}>
      {/* 2 Columns */}
      <div className="fxg-col col-sm-2">
        <div style={{}}>
          <div className="image_v2 image section">
            {/* CHANGE: VMLNAFEDEXW-826 Added drag and drop in Pods */}
            {/* Improved this component */}
            <div className="fxg-image-component   fxg-tablet--hide fxg-mobile--hide">
              <div className="fxg-image-component__image">
                <picture>
                  <img
                    className="fxg-img"
                    src="/images/icons/jumplink_arrow.svg"
                    alt="arrow icon"
                    style={{ height: "150%", width: "150%" }}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fxg-col col-sm-10">
        <div style={{}}>
          <div className="button_v1 section">
            <div className="link">
              {/* Link in not using New FDL and Using Target  */}
              {/* Link in not using New FDL and Not Using Target  */}
              <Link
                href={href}
                aria-label={title}
                title='alt=""'
                target="_self"
                className="fxg-link  js-fxgc-init  default  fxg-link--mobile-align-left"
                style={{ color: "inherit" }}
              >
                {title}
              </Link>
            </div>
          </div>
          <div className="richtext parbase section">
            <div
              className="fxg-rte      "
              style={{}}
              data-emptytext="Rich Text"
            >
              <p>
                <span className="fxg-font-size-14">{desc}</span>
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* COLUMN CONTROL END */}
  </div>
);
