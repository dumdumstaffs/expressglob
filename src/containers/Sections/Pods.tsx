import useWindowDimensions from "@web/hooks/useWindowDimensions";
import Link from "next/link";
import { useState } from "react";

const TITLE = "Tips and tools to help you keep up and get ahead";

const ITEMS = [
  {
    title: "Hold packages for pickup",
    image: "/images/fy21_apac_150.jpg",
    href: "/shipping/hold-at-location",
    linkText: "Track and hold",
    desc: "Help keep your deliveries safe when you ask us to hold packages at one of thousands of nearby ModernExpress® locations.Track your package to begin.",
  },
  {
    title: "Save on shipping",
    image: "/images/fy22_england_42.jpg",
    href: "/open-account",
    linkText: "start saving",
    desc: "Create a free account and enjoy discounts on shipping, easy access to saved delivery addresses, quick payments using your stored profile settings and more.",
  },
  {
    title: "Pack it to arrive safely",
    image: "/images/fy22_shutterstock_1821.jpg",
    href: "/shipping/packing",
    linkText: "find supplies",
    desc: "Whether you need boxes, reusable packaging, bubble wrap, or packing tape, or you want help packing fragile items, we have you covered.",
  },
];

export function PodsCarousel() {
  const { width } = useWindowDimensions();

  const [active, setActive] = useState(0);

  return (
    <div className="pods_container">
      <div className="fxg-pods fxg-pods--fixed  fxg-tablet--hide fxg-desktop--hide">
        <div className="fxg-wrapper container">
          <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
            <div className="spacer aem-GridColumn aem-GridColumn--default--12">
              <div
                className="fxg-spacer"
                style={{ height: 13, backgroundColor: "default" }}
              />
            </div>
            <div className="title_v1 aem-GridColumn aem-GridColumn--default--12">
              <h2 className="fxg-title fxg-title--default fxg-title--align-center    ">
                {TITLE}
              </h2>
            </div>
          </div>
          <div
            className="row fxg-swipe fxg-swipe--active"
            style={{ height: 440, visibility: "visible" }}
          >
            <div
              className="fxg-swipe__wrapper"
              style={{ width: width * 3 + "px", left: "0px" }}
            >
              {ITEMS.map((item, i) => (
                <CarouselItem
                  key={i}
                  {...item}
                  index={i}
                  active={active === i}
                  next={(active + 1) % ITEMS.length === i}
                  width={width}
                />
              ))}
            </div>
            <ul className="fxg-slider__indecators">
              {ITEMS.map((_, i) => (
                <li
                  key={i}
                  className={`fxg-slider__indecator ${
                    active === i ? "active" : ""
                  }`}
                  onClick={() => setActive(i)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type CarouselItemProps = (typeof ITEMS)[number] & {
  width: number;
  index: number;
  active: boolean;
  next: boolean;
};

const CarouselItem = ({
  title,
  image,
  href,
  linkText,
  desc,
  width,
  index,
  active,
  next,
}: CarouselItemProps) => (
  <div
    className="fxg-col fxg-swipe__item col-sm-4"
    style={{
      width: width + "px",
      left: -index * width + "px",
      transitionDuration: "300ms",
      transform: `translate(${
        active ? 0 : next ? width : -width
      }px, 0px) translateZ(0px)`,
      zIndex: active || next ? 1 : -100,
    }}
  >
    <div className="fxg-image-component">
      <div className="fxg-image-component__image">
        <img
          className="fxg-img"
          src={image}
          alt=""
          aria-hidden="true"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
    <h3 className="fxg-title">{title}</h3>
    <p>{desc}</p>
    <Link
      href={href}
      target="_self"
      aria-label={linkText}
      className="fxg-link js-fxgc-init fxg-link--rounded_button fxg-button--round carouselsetting"
      style={{ maxHeight: 72, overflow: "hidden" }}
    >
      {linkText}
    </Link>
  </div>
);

export function PodsRow() {
  return (
    <div style={{ marginBottom: "80px" }}>
      <div className="title_v1">
        <h2 className="fxg-title fxg-title--default fxg-title--align-center fxg-mobile--hide">
          {TITLE}
        </h2>
      </div>
      <div className="column_control_v1">
        <div className="row" style={{}}>
          {ITEMS.map((item, i) => (
            <RowItem key={i} {...item} />
          ))}
        </div>
      </div>
      <div className="column_control_v1">
        <div className="row" style={{}}>
          {ITEMS.map((item, i) => (
            <RowButton key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const RowItem = ({
  title,
  image,
  desc,
}: Pick<(typeof ITEMS)[number], "title" | "image" | "desc">) => (
  <div className="fxg-col col-sm-4 fxg-mobile--hide ">
    <div style={{}}>
      <div className="image_v2 image section">
        <div className="fxg-image-component    ">
          <div className="fxg-image-component__image">
            <img
              className="fxg-img"
              src={image}
              alt=""
              aria-hidden="true"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="title_v1 section">
        <h3
          className="fxg-title fxg-title--custom fxg-title--align-center    "
          style={{
            fontSize: 20,
            color: "default",
            fontWeight: "normal",
          }}
        >
          {title}
        </h3>
      </div>
      <div className="richtext parbase section">
        <input id="justifyRteRtl" type="hidden" defaultValue="false" />
        <div
          className="fxg-rte  fxg-rte--align-center    "
          style={{ color: "default" }}
          data-emptytext="Rich Text"
        >
          <p>{desc}</p>
        </div>
      </div>
    </div>
  </div>
);

const RowButton = ({
  href,
  linkText,
}: Pick<(typeof ITEMS)[number], "href" | "linkText">) => (
  <div className="fxg-col col-sm-4 fxg-mobile--hide">
    <div style={{}}>
      <div className="button_v1 section">
        <div className="link    ">
          <Link
            href={href}
            aria-label={linkText}
            target="_self"
            className="fxg-link  js-fxgc-init  fxg-link--rounded_button fxg-button--round fxg-link--align-center        "
            style={{ color: "inherit" }}
          >
            {linkText}
          </Link>
          <input
            type="hidden"
            defaultValue='<div class="alert alert-danger">Image is not internal. Cannot convert SVG to code.</div>'
            id="fxg-externalIconPath"
          />
        </div>
      </div>
    </div>
  </div>
);
