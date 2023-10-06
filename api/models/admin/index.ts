import mongoose from "mongoose";
import { AdminPlugin } from "./plugin";
import { AdminDocument, AdminModel } from "./types";

const AdminSchema = new mongoose.Schema<AdminDocument, AdminModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

AdminPlugin.plugin(AdminSchema);

export const Admin =
  (mongoose.models.Admin as AdminModel) ||
  mongoose.model<AdminDocument, AdminModel>("Admin", AdminSchema);

export type { AdminDocument, AdminModel } from "./types";
export { AdminResource, AdminPaginatedCollection } from "./resource";
