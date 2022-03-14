import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import AdminService from "@/services/admin";
import AdminSchema from "@/schemas/admin";
import { AdminPaginatedCollection, AdminResource } from "@/models/admin";

@Controller(admin)
class Handler {
    constructor(private readonly adminService: AdminService) { }

    @Route()
    async get(req: TypedRequest, res: TypedResponse<AdminPaginatedCollection>) {
        // await new Promise(r => setTimeout(r, 4000))

        const admins = await this.adminService.getAll(req)

        res.json(admins)
    }

    @Route(AdminSchema.create)
    public async post(req: TypedRequest<typeof AdminSchema.create>, res: TypedResponse<AdminResource>) {

        const profile = await this.adminService.createOrFail(req.validated)

        res.json(profile)
    }

}

export default handle(Handler)