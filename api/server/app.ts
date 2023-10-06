import { connectDb } from "@api/lib/db";
import { serverConfig } from "@api/utils/config";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import captureWebsite from "capture-website";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createContext } from "./context";
import { appRouter } from "./routers/_app";

export const app = express();

connectDb();

app.use(express.json());
app.use(cors({ credentials: true, origin: serverConfig.app.DOMAIN }));
app.use(cookieParser());

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

    console.log({ url });

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
