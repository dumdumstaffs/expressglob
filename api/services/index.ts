import { AdminService } from "./admin";
import { BootstrapService } from "./bootstrap";
import { MailService } from "./mail";
import { MediaService } from "./media";
import { SessionService } from "./session";
import { SettingsService } from "./settings";
import { ShipmentService } from "./shipment";

class Container {
  public session: SessionService;
  public admin: AdminService;
  public media: MediaService;
  public shipment: ShipmentService;
  public mail: MailService;
  public bootstrap: BootstrapService;
  public settings: SettingsService;

  constructor() {
    this.session = new SessionService();
    this.admin = new AdminService();
    this.media = new MediaService();
    this.shipment = new ShipmentService(this.media);
    this.mail = new MailService();
    this.bootstrap = new BootstrapService(this.admin);
    this.settings = new SettingsService();
  }
}

export const container = new Container();
