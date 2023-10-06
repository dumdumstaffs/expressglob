"use client";

import { useMediaQuery } from "@web/hooks/useMediaQuery";
import Link from "next/link";

type Offer = {
  title: string;
  href: string;
  linkText: string;
  image: string;
  desc: string;
  imageDir?: "left" | "right";
  smImageDir?: "top" | "bottom";
  largeText?: boolean;
};

export function FeaturedOffer(offer: Offer) {
  const smallScreen = useMediaQuery("(max-width: 767px)");

  return (
    <div className="featured_offer_v2">
      <div className="fxg-wrapper fxg-featured-offer-wrapper">
        {/* LAYOUT 1: IMAGE ON RIGHT */}
        <div
          className="fxg-featured-offer fxg-featured-offer-layout-two layout2"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          {smallScreen ? (
            offer.smImageDir === "bottom" ? (
              <DetailDisplay imageFirst={false} offer={offer} />
            ) : (
              <DetailDisplay imageFirst={true} offer={offer} />
            )
          ) : offer.imageDir === "right" ? (
            <DetailDisplay imageFirst={false} offer={offer} />
          ) : (
            <DetailDisplay imageFirst={true} offer={offer} />
          )}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      {/* End Featured offer */}
    </div>
  );
}

const DetailDisplay = ({
  imageFirst,
  offer,
}: {
  imageFirst: boolean;
  offer: Offer;
}) => (
  <>
    {imageFirst ? (
      <>
        <DetailImage image={offer.image} />
        <Detail
          title={offer.title}
          href={offer.href}
          linkText={offer.linkText}
          desc={offer.desc}
          largeText={offer.largeText}
        />
      </>
    ) : (
      <>
        <Detail
          title={offer.title}
          href={offer.href}
          linkText={offer.linkText}
          desc={offer.desc}
          largeText={offer.largeText}
        />
        <DetailImage image={offer.image} />
      </>
    )}
  </>
);

const Detail = ({
  title,
  href,
  linkText,
  desc,
  largeText,
}: Omit<Offer, "image" | "layout2">) => (
  <div className="fxg-featured-offer__detail">
    <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
      <div className="spacer aem-GridColumn aem-GridColumn--default--12">
        <div
          className="fxg-spacer fxg-spacer-hide--mobile"
          style={{ height: 13, backgroundColor: "default" }}
        />
        <div
          className="fxg-spacer fxg-spacer-hide--tablet"
          style={{ height: 16, backgroundColor: "default" }}
        />
        <div
          className="fxg-spacer fxg-spacer-hide--desktop"
          style={{ height: 16, backgroundColor: "default" }}
        />
      </div>
      <div className="title_v1 aem-GridColumn aem-GridColumn--default--12">
        <h3
          className="fxg-title fxg-title--default     "
          style={{ marginTop: 0, marginBottom: 9 }}
        >
          {title}
        </h3>
      </div>
      <div className="richtext parbase aem-GridColumn aem-GridColumn--default--12">
        {/* CHANGE: VMLNAFEDEXW-356 Added expressions to deal with Viewport Settings */}
        <input id="justifyRteRtl" type="hidden" defaultValue="false" />
        <div className="fxg-rte      " style={{}} data-emptytext="Rich Text">
          <p>
            {largeText ? (
              <span className="fxg-font-size-18">{desc}</span>
            ) : (
              desc
            )}
          </p>
        </div>
      </div>
      <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
        <div className="link    ">
          {/* Link in not using New FDL and Using Target  */}
          {/* Link in not using New FDL and Not Using Target  */}
          <Link
            href={href}
            aria-label={linkText}
            title='alt=""'
            target="_self"
            className="fxg-link js-fxgc-init fxg-link--blue"
            style={{ color: "inherit" }}
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const DetailImage = ({ image }: { image: string }) => (
  <div className="fxg-featured-offer__detail-image">
    <img
      src={image}
      alt=""
      className="fxg-image"
      width="100%"
      height="100%"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  </div>
);
