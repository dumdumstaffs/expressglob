import { NextApiRequest } from "next"
import { Conflict, Unauthorized } from "http-errors"
import { Inject } from "@/utils/di"
import { Admin, AdminResource } from "@/models/admin"
import { AdminCreateDto } from "@/schemas/admin"

@Inject()
export default class AdminService {
    public async getAll(req: NextApiRequest) {
        const admins = await Admin.find().sort("-createdAt").paginate(req)

        return AdminResource.paginate(admins)
    }

    public async findByIdOrFail(id: string, password?: string) {
        const admin = await Admin.findById(id)
        if (!admin) throw new Unauthorized("Admin not found")

        if (password) {
            const validPassword = await admin.validatePassword(password)
            if (!validPassword) throw new Unauthorized("Invalid credentials")
        }
        return new AdminResource(admin)
    }

    public async findOrFail(email: string, password?: string) {
        const admin = await Admin.findOne({ email })
        if (!admin) throw new Unauthorized("Admin not found")

        if (password) {
            const validPassword = await admin.validatePassword(password)
            if (!validPassword) throw new Unauthorized("Invalid credentials")
        }
        return new AdminResource(admin)
    }

    public async createOrFail(
        adminCreateData: AdminCreateDto
    ) {
        const exists = await this.findOrFail(adminCreateData.email)
            .then(() => true)
            .catch(() => false)

        if (exists) throw new Conflict("Admin already exists")

        const { confirmPassword, ...adminData } = adminCreateData

        const admin = await Admin.create(adminData)

        return new AdminResource(admin)
    }

    public async removeOrFail(id: string) {
        const admin = await this.findByIdOrFail(id)

        await admin.raw().remove()
    }
}
