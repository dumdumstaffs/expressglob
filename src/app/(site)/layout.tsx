import "@web/styles/globals.css";
import "@web/styles/poc-banner.css";
import "@web/styles/print.css";

import { TRPCProvider } from "@web/api/trpc";
import Footer from "@web/containers/Footer";
import Header from "@web/containers/Header";
import { clientConfig } from "@web/utils/config";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ModernExpress | Tracking, Shipping, and Locations",
  description:
    "Use the ModernExpress site to login to your ModernExpress account, get your tracking status, find a ModernExpress near you, learn more about how to become a better shipper, get online print offers, or get inspiration for your small business needs. ",
  keywords:
    "marketing:products_services/tools/calculators/rates,marketing:products_services/ship/locations,marketing:products_services/location/us,marketing:products_services/print,marketing:products_services/ship,marketing:products_services/tools/contact",
  formatDetection: { telephone: false },
  metadataBase: new URL(clientConfig.app.domain),
  openGraph: {
    type: "website",
    siteName: "ModernExpress",
    url: "/",
    title: "The New ModernExpress.org - Tracking, Shipping &amp; Locations",
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
    <html>
      <body className="page basicpage">
        <div className="fxg-main-content">
          <TRPCProvider>
            <Header />
            <div className="root responsivegrid">
              <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                <div className="responsivegrid aem-GridColumn--default--none aem-GridColumn aem-GridColumn--default--12 aem-GridColumn--offset--default--0">
                  <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </TRPCProvider>
        </div>
      </body>
    </html>
  );
}
