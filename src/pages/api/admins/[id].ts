import { BadRequest } from "http-errors"
import { Controller, handle, Route } from "@/utils/handler";
import type { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import AdminService from "@/services/admin";
import Bootstrap from "@/services/bootstrap";

@Controller(admin)
class Handler {
    constructor(private readonly adminService: AdminService, private readonly bootstrap: Bootstrap) { }

    @Route()
    public async delete(req: TypedRequest<null, { id: string }>, res: TypedResponse) {

        const { id } = req.query

        if (id === req.admin?.id) throw new BadRequest("Cannot remove self")

        const safeToRemove = await this.bootstrap.safeToRemove(id)
        if (!safeToRemove) throw new BadRequest("Cannot remove root admin")

        await this.adminService.removeOrFail(id)

        res.json({ message: "Admin removed Successfully" })
    }

}

export default handle(Handler)