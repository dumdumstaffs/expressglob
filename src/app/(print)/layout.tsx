import "@web/styles/globals.css";

import { TRPCProvider } from "@web/api/trpc";

export const metadata = {
  title: "Invoice",
  description: "Generated Invoice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
