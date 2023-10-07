import { connectDb } from "@api/lib/db";
import { serverConfig } from "@api/utils/config";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { createContext } from "./context";
import { appRouter } from "./routers/_app";

export const app = express();

connectDb();

app.use(express.json());
app.use(cors());

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get("/api/invoice/:trackingId", async (req, res) => {
  try {
    const trackingId = req.params.trackingId;
    const url = serverConfig.app.DOMAIN + `/invoice?trackingId=${trackingId}`;

    const captureWebsite = await import("capture-website").then(
      (mod) => mod.default,
    );
    const buffer = await captureWebsite.buffer(url, {
      width: 414,
      height: 600,
      hideElements: [".download"],
    });

    res.writeHead(200, {
      "Content-type": "image/png",
      "Content-length": buffer.length,
      "Content-disposition": `attachment; filename=Invoice - ${trackingId}.png`,
    });
    res.end(buffer);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});
