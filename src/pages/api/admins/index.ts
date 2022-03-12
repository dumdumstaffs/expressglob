import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import AdminService from "@/services/admin";
import AdminSchema from "@/schemas/admin";
import { PaginatedResponse } from "@/types";
import { Admin } from "@/types/admin";
import { config } from "@/utils/config";

@Controller(admin)
class Handler {
    constructor(private readonly adminService: AdminService) { }

    @Route()
    async get(req: TypedRequest, res: TypedResponse<PaginatedResponse<Admin>>) {
        // await new Promise(r => setTimeout(r, 4000))

        const admins = await this.adminService.getAll(req)

        const filteredAdmins = { ...admins, data: admins.data.filter(admin => admin.email !== config.admin.EMAIL)}

        res.json(filteredAdmins)
    }

    @Route(AdminSchema.create)
    public async post(req: TypedRequest<typeof AdminSchema.create>, res: TypedResponse<Admin>) {

        const profile = await this.adminService.createOrFail(req.validated)

        res.json(profile.get())
    }

}

export default handle(Handler)