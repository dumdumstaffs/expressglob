import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import { AdminResource } from "@/models/admin";

@Controller(admin)
class Handler {
    constructor() { }

    @Route()
    public async get(req: TypedRequest, res: TypedResponse<AdminResource>) {

        const profile = new AdminResource(req.admin)

        res.json(profile)
    }

}

export default handle(Handler)