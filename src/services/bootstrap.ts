import { config } from "@/utils/config";
import { Inject } from "@/utils/di";
import AdminService from "@/services/admin";

@Inject()
export default class Bootstrap {
    constructor(private readonly adminService: AdminService) { }

    private isValidCredentials(email: string, password: string) {
        if (config.admin.EMAIL === email && config.admin.PASS === password) return true
        return false
    }

    private async adminSetupCorrectly() {
        const admin = await this.adminService.findOrFail(config.admin.EMAIL, config.admin.PASS)
        return !!admin
    }

    private async adminExists() {
        const admin = await this.adminService.findOrFail(config.admin.EMAIL)

        return admin
    }

    public async initialize(email: string, password: string) {
        if (!this.isValidCredentials(email, password)) return

        try {
            const isSetupSuccessfully = await this.adminSetupCorrectly()

            if (isSetupSuccessfully) {
                // console.log("Admin setup correctly!")
                return
            }

            const admin = await this.adminExists()
            const adminDocument = admin.raw()
            // console.log("Admin password changed, resetting password...")

            adminDocument.password = config.admin.PASS
            await adminDocument.save()

            // console.log("Admin reset successfully!")
        } catch (err) {
            // console.log("Admin does not exist")

            await this.adminService.createOrFail({
                email: config.admin.EMAIL,
                password: config.admin.PASS,
                confirmPassword: config.admin.PASS,
                firstName: "Fedex",
                lastName: "Manager"
            })

            // console.log("Admin setup successfully!")
        }

    }

    public async safeToRemove(id: string) {
        try {
            const admin = await this.adminService.findByIdOrFail(id)

            if (admin.get().email === config.admin.EMAIL) return false

            return true
        } catch (error) {
            return true
        }
    }
}