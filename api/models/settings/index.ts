import mongoose from "mongoose";
import { SettingsDocument, SettingsModel } from "./types";

const SettingsSchema = new mongoose.Schema<SettingsDocument, SettingsModel>({
  whatsapp: {
    type: String,
  },
});

export const Settings =
  (mongoose.models.Shipment as SettingsModel) ||
  mongoose.model<SettingsDocument, SettingsModel>("Settings", SettingsSchema);

export { SettingsResource } from "./resource";
export type { SettingsDocument, SettingsModel } from "./types";
