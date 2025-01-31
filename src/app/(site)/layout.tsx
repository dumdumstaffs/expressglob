import Footer from "@web/containers/Footer";
import Header from "@web/containers/Header";
import { Support } from "@web/containers/Support";
import { clientConfig } from "@web/utils/config";
import { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ExpressGlob | Tracking, Shipping, and Locations",
  description:
    "Use the ExpressGlob site to login to your ExpressGlob account, get your tracking status, find a ExpressGlob near you, learn more about how to become a better shipper, get online print offers, or get inspiration for your small business needs. ",
  keywords:
    "marketing:products_services/tools/calculators/rates,marketing:products_services/ship/locations,marketing:products_services/location/us,marketing:products_services/print,marketing:products_services/ship,marketing:products_services/tools/contact",
  formatDetection: { telephone: false },
  metadataBase: new URL("", clientConfig.app.domain),
  openGraph: {
    type: "website",
    siteName: "ExpressGlob",
    url: "/",
    title: "The New ExpressGlob.org - Tracking, Shipping &amp; Locations",
    description:
      "Become a better shipper, printing offers, or get inspiration for your small business.",
  },
  other: {
    locale: "en_us",
    template: "homepage",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fxg-main-content">
      <Script src="/livechat.js" />
      <Header />
      <div className="root responsivegrid">
        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
          <div className="responsivegrid aem-GridColumn--default--none aem-GridColumn aem-GridColumn--default--12 aem-GridColumn--offset--default--0">
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Support />
      <Footer />
    </div>
  );
}
