import "@web/styles/css/base.css";
import "@web/styles/css/dependencies.css";
import "@web/styles/css/kalturavideopicker.css";

import "@web/styles/globals.css";
import "@web/styles/poc-banner.css";
import "@web/styles/print.css";

import { TRPCProvider } from "@web/api/trpc";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-us" dir="ltr">
      <body className="page basicpage">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
