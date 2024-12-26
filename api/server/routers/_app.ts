import { router } from "@api/server/trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { mailRouter } from "./mail";
import { settingsRouter } from "./settings";
import { shipmentRouter } from "./shipment";

export const appRouter = router({
  auth: authRouter,
  admin: adminRouter,
  mail: mailRouter,
  shipment: shipmentRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
