import { AdminService } from "@api/services/admin";
import { serverConfig } from "@api/utils/config";

export class BootstrapService {
  constructor(private readonly adminService: AdminService) {}

  private async isAdminSetupCorrectly() {
    const admin = await this.adminService.findByEmail(
      serverConfig.admin.EMAIL,
      serverConfig.admin.PASS,
    );
    return !!admin;
  }

  private async getExistingAdmin() {
    const admin = await this.adminService.findByEmail(serverConfig.admin.EMAIL);

    return admin;
  }

  public async initialize(email: string, password: string) {
    if (
      email !== serverConfig.admin.EMAIL ||
      password !== serverConfig.admin.PASS
    ) {
      return;
    }

    if (await this.isAdminSetupCorrectly()) {
      // console.log("Admin setup correctly!")
      return;
    }

    const admin = await this.getExistingAdmin();
    if (admin) {
      const adminDocument = admin.raw();
      // console.log("Admin password changed, resetting password...")

      adminDocument.password = serverConfig.admin.PASS;
      await adminDocument.save();
      // console.log("Admin reset successfully!")
    } else {
      // console.log("Admin does not exist")
      await this.adminService.create({
        email: serverConfig.admin.EMAIL,
        password: serverConfig.admin.PASS,
        confirmPassword: serverConfig.admin.PASS,
        firstName: "Shipment",
        lastName: "Manager",
      });
      // console.log("Admin setup successfully!")
    }
  }

  public async safeToRemove(id: string) {
    const admin = await this.adminService.findById(id);
    if (admin && admin.doc().email === serverConfig.admin.EMAIL) return false;
    return true;
  }
}
