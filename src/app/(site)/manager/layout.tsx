import { AuthMiddleware } from "@web/middlewares/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthMiddleware>{children}</AuthMiddleware>;
}
