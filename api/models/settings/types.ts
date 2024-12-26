import { Settings } from "@shared/types/settings";
import { Model } from "mongoose";

// document instance
export interface SettingsDocument extends Settings {}

// document overrides
interface SettingsOverrides {}

// query helpers
export interface SettingsQueryHelpers {}

// static methods
export interface SettingsModel
  extends Model<SettingsDocument, SettingsQueryHelpers, SettingsOverrides> {}
