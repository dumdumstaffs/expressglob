import { ModelResource } from "@api/utils/models";
import { Settings } from "@shared/types/settings";
import { SettingsDocument, SettingsModel } from "./types";

export class SettingsResource extends ModelResource<
  Settings,
  SettingsDocument,
  SettingsModel
> {
  protected transform(): Settings {
    return {
      id: this._doc.id,
      whatsapp: this._doc.whatsapp,
    };
  }
}
