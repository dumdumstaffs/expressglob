import { AdminService } from "./admin";
import { BootstrapService } from "./bootstrap";
import { MediaService } from "./media";
import { SessionService } from "./session";
import { ShipmentService } from "./shipment";

class Container {
  public session: SessionService;
  public admin: AdminService;
  public media: MediaService;
  public shipment: ShipmentService;
  public bootstrap: BootstrapService;

  constructor() {
    this.session = new SessionService();
    this.admin = new AdminService();
    this.media = new MediaService();
    this.shipment = new ShipmentService(this.media);
    this.bootstrap = new BootstrapService(this.admin);
  }
}

export const container = new Container();
