import { GuestMiddleware } from "@web/middlewares/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestMiddleware>{children}</GuestMiddleware>;
}
