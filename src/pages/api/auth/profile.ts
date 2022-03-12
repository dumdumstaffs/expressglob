import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { Admin } from "@/types/admin";
import { admin } from "@/middlewares/admin";
import { AdminResource } from "@/models/admin";

@Controller(admin)
class Handler {
    constructor() { }

    @Route()
    public async get(req: TypedRequest, res: TypedResponse<Admin>) {

        const profile = new AdminResource(req.admin)

        res.json(profile.get())
    }

}

export default handle(Handler)