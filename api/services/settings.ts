import { Settings, SettingsResource } from "@api/models/settings";
import { Settings as SettingsData } from "@shared/types/settings";

export class SettingsService {
  public async get() {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return new SettingsResource(settings);
  }

  public async update(id: string, data: Partial<SettingsData>) {
    return await Settings.findByIdAndUpdate(id, data);
  }
}
