import Hero from "@web/containers/Hero";
import {
  ActionIcons,
  FeaturedOffer,
  PocBanner,
  PodsCarousel,
  PodsRow,
} from "@web/containers/Sections";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container responsivegrid fxg-wrapper aem-GridColumn aem-GridColumn--default--12">
        <div className="cmp-container">
          <div className="spacer">
            <div
              className="fxg-spacer fxg-spacer-hide--mobile"
              style={{ height: 13, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--tablet"
              style={{ height: 13, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--desktop"
              style={{ height: 40, backgroundColor: "default" }}
            />
          </div>
          <div className="title_v1">
            <PocBanner />

            <h2
              className="fxg-title fxg-title--default fxg-title--align-center fxg-title--mobile-align-center   "
              style={{ marginTop: 5, marginBottom: 25 }}
            >
              Manage your shipments and returns
            </h2>
          </div>
          <div className="spacer">
            <div
              className="fxg-spacer fxg-spacer-hide--mobile"
              style={{ height: 20, backgroundColor: "default" }}
            />
          </div>
          <ActionIcons />
          <FeaturedOffer
            title="Promote small business success"
            href="/small-business"
            linkText="get started"
            image="/images/img1.jpg"
            desc="Whether you're in need of e-commerce tips, ready to ship orders, or simply looking for inspiration, the Small Business Resource Center is the perfect place to start."
            imageDir="right"
          />
          <FeaturedOffer
            title="Celebrate Black History Month"
            href="/small-business/grant-contest/2021-winners/black-owned-businesses"
            linkText="read more"
            image="/images/Copy-of-TradeStJam-9167_WithText.jpg"
            desc="Every February we celebrate the achievements of Black Americans.This year we're recognizing three thriving Black- owned businesses, featuring the 2021 Small Business Grant Contest winner Trade Street Jam Co."
            largeText
          />
          <PodsCarousel />
          <PodsRow />
          <div className="spacer">
            <div
              className="fxg-spacer"
              style={{ height: 2, backgroundColor: "default" }}
            />
          </div>
          <FeaturedOffer
            title="Take control of your home deliveries"
            href="/fdmenrollment"
            linkText="sign up for free"
            image="/images/fy22_shutterstock_54.jpg"
            desc="Sign up for ExpressGlob Delivery Manager® to place holds, give delivery instructions, sign remotely, and more. Stay informed with tracking alerts and notifications."
          />
          <div className="spacer">
            <div
              className="fxg-spacer fxg-spacer-hide--mobile"
              style={{ height: 35, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--tablet"
              style={{ height: 20, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--desktop"
              style={{ height: 20, backgroundColor: "default" }}
            />
          </div>
          <div className="title_v1">
            <h3
              className="fxg-title fxg-title--custom     "
              style={{
                fontSize: 20,
                color: "default",
                fontWeight: "normal",
              }}
            >
              Money-Back Guarantee
            </h3>
          </div>
          <div className="richtext parbase">
            {/* CHANGE: VMLNAFEDEXW-356 Added expressions to deal with Viewport Settings */}
            <input id="justifyRteRtl" type="hidden" defaultValue="false" />
            <div
              className="fxg-rte      "
              style={{}}
              data-emptytext="Rich Text"
            >
              <p>
                On January 17th, 2022,{" "}
                <Link href="/service-guide/money-back-guarantee">
                  money-back guarantee
                </Link>{" "}
                was reinstated for select ExpressGlob Express<sup>®</sup>{" "}
                services for U.S. domestic shipments and U.S. export shipments.
              </p>
            </div>
          </div>
          <div className="spacer">
            <div
              className="fxg-spacer fxg-spacer-hide--mobile"
              style={{ height: 13, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--tablet"
              style={{ height: 13, backgroundColor: "default" }}
            />
            <div
              className="fxg-spacer fxg-spacer-hide--desktop"
              style={{ height: 30, backgroundColor: "default" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
