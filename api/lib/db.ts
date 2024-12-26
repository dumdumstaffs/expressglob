import { serverConfig } from "@api/utils/config";
import mongoose from "mongoose";

let connection: number;

export const connectDb = () => {
  if (connection) {
    console.log("Mongoose reusing connection");
    return Promise.resolve();
  }

  mongoose.set("strictQuery", true);
  return mongoose
    .connect(serverConfig.database.URI)
    .then((db) => {
      console.log("Mongoose connected");

      connection = db.connections[0].readyState;
    })
    .catch((err) => {
      console.log("Mongoose error", err.message);
    });
};
