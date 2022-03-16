import { NextApiRequest } from "next"
import { Inject } from "@/utils/di"
import { AppError } from "@/utils/error"
import { Admin, AdminPaginatedCollection, AdminResource } from "@/models/admin"
import { AdminCreateDto } from "@/schemas/admin"

@Inject()
export default class AdminService {
    public async getAll(req: NextApiRequest) {
        const admins = await Admin.find().sort("-createdAt").filter(req, "email").paginate(req)

        return new AdminPaginatedCollection(admins)
    }

    public async findByIdOrFail(id: string, password?: string) {
        const admin = await Admin.findById(id)
        if (!admin) throw new AppError("Admin not found", AppError.ErrorCodes.NotFound)

        if (password) {
            const validPassword = await admin.validatePassword(password)
            if (!validPassword) throw new AppError("Invalid credentials", AppError.ErrorCodes.Unauthorized)
        }
        return new AdminResource(admin)
    }

    public async findOrFail(email: string, password?: string) {
        const admin = await Admin.findOne({ email })
        if (!admin) throw new AppError("Admin not found", AppError.ErrorCodes.NotFound)

        if (password) {
            const validPassword = await admin.validatePassword(password)
            if (!validPassword) throw new AppError("Invalid credentials", AppError.ErrorCodes.Unauthorized)
        }
        return new AdminResource(admin)
    }

    public async createOrFail(
        adminCreateData: AdminCreateDto
    ) {
        const exists = await this.findOrFail(adminCreateData.email)
            .then(() => true)
            .catch(() => false)

        if (exists) throw new AppError("Admin already exists", AppError.ErrorCodes.Conflict)

        const { confirmPassword, ...adminData } = adminCreateData

        const admin = await Admin.create(adminData)

        return new AdminResource(admin)
    }

    public async removeOrFail(id: string) {
        const admin = await this.findByIdOrFail(id)

        await admin.raw().remove()
    }
}
