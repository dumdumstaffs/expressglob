import Link from "next/link";

const links = {
  drop: "/drop-off",
  redirect: "/hold-at-location",
  store: "/locale",
  service: "/service-alerts",
  return: "/returns",
};

export function ActionIcons() {
  return (
    <>
      <div className="advanced_table_v1 table parbase">
        <div
          className="fxg-table-wrapper fxg-table--stackable fxg-mobile--hide"
          data-emptytext="ModernExpress - Table Component (Advanced)"
        >
          <table
            // border={0}
            width="100%"
            cellSpacing={0}
            // headers="top"
            className="fxg-table"
            cellPadding={1}
          >
            <caption style={{ display: "none" }} />
            <thead>
              <tr>
                <TableIcon
                  title="drop off a package"
                  href={links.drop}
                  image="/images/icons/icon_courier_purple_lg_1637809911.png"
                />
                <TableIcon
                  title="Redirect a package"
                  href={links.redirect}
                  image="/images/icons/icon_delivery_purple_lg_2143296207.png"
                />
                <TableIcon
                  title="Store hours and services"
                  href={links.store}
                  image="/images/icons/retail-services.svg"
                />
                <TableIcon
                  title="Service alerts"
                  href={links.service}
                  image="/images/icons/icon_alert_purple_lg.png"
                />
                <TableIcon
                  title="Return a package"
                  href={links.return}
                  image="/images/icons/icon_returns_purple_lg_1184917500.png"
                />
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <div className="column_control_v1">
        {/* COLUMN CONTROL START */}
        <div className="row">
          {/* 5 Columns */}
          <RowIcon
            title="drop off a package"
            href={links.drop}
            image="/images/icons/icon_courier_purple_lg_1637809911.png"
          />
          <RowIcon
            title="Redirect a package"
            href={links.redirect}
            image="/images/icons/delivery.svg"
          />
          <RowIcon
            title="Store hours and services"
            href={links.store}
            image="/images/icons/icon_retail_services_purple_med.png"
          />
          <RowIcon
            title="Service alerts"
            href={links.service}
            image="/images/icons/icon_alert_purple_lg.png"
          />
          <RowIcon
            title="Return a package"
            href={links.return}
            image="/images/icons/icon_returns_purple_lg_1184917500.png"
          />
        </div>
        {/* COLUMN CONTROL END */}
      </div>
    </>
  );
}

type IconProps = {
  title: string;
  image: string;
  href: string;
};

const TableIcon = ({ title, href, image }: IconProps) => (
  <th>
    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
      <div className="image_v2 image aem-GridColumn aem-GridColumn--default--12">
        <div className="fxg-image-component fxg-mobile--hide">
          <div className="fxg-image-component__image">
            <Link href={href} target="_self" className="fxg-image-link">
              <img
                className="fxg-img"
                src={image}
                alt=""
                aria-hidden="true"
                style={{ height: "100%", width: "67%" }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="title_v1 aem-GridColumn aem-GridColumn--default--12">
        <p
          className="fxg-title fxg-title--default"
          style={{ marginTop: 8, marginBottom: 5 }}
        >
          <br />
        </p>
      </div>
      <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
        <div className="link">
          <Link
            href={href}
            aria-label={title}
            target="_self"
            className="fxg-link js-fxgc-init fxg-link--blue fxg-link--align-center"
            style={{ color: "inherit" }}
          >
            {title}
          </Link>
        </div>
      </div>
    </div>
  </th>
);

const RowIcon = ({ title, href, image }: IconProps) => (
  <div className="fxg-col col-sm-2 fxg-desktop--hide fxg-tablet--hide">
    <div>
      <div className="image_v2 image section">
        <div className="fxg-image-component">
          <div className="fxg-image-component__image">
            <Link href={href} target="_self" className="fxg-image-link">
              <img
                className="fxg-img"
                src={image}
                alt=""
                aria-hidden="true"
                style={{ height: "100%", width: "25%" }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="title_v1 section">
        <p
          className="fxg-title fxg-title--default     "
          style={{ marginTop: 0, marginBottom: 0 }}
        >
          <br />
        </p>
      </div>
      <div className="button_v1 section">
        <div className="link    ">
          <Link
            href={href}
            aria-label={title}
            target="_self"
            className="fxg-link js-fxgc-init fxg-link--blue fxg-link--align-center        "
            style={{ color: "inherit" }}
          >
            {title}
          </Link>
          <input
            type="hidden"
            defaultValue='<div class="alert alert-danger">Image is not internal. Cannot convert SVG to code.</div>'
            id="fxg-externalIconPath"
          />
        </div>
      </div>
      <div className="spacer section">
        <div
          className="fxg-spacer fxg-spacer-hide--mobile"
          style={{ height: 35, backgroundColor: "default" }}
        />
        <div
          className="fxg-spacer fxg-spacer-hide--tablet"
          style={{ height: 13, backgroundColor: "default" }}
        />
        <div
          className="fxg-spacer fxg-spacer-hide--desktop"
          style={{ height: 13, backgroundColor: "default" }}
        />
      </div>
    </div>
  </div>
);
