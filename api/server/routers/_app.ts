import { router } from "@api/server/trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { shipmentRouter } from "./shipment";

export const appRouter = router({
  auth: authRouter,
  admin: adminRouter,
  shipment: shipmentRouter,
});

export type AppRouter = typeof appRouter;
