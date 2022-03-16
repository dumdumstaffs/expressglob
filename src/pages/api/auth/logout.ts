import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";
import SessionService from "@/services/session";

@Controller(admin)
class Handler {
    constructor(private readonly sessionService: SessionService) { }

    @Route()
    public async post(req: TypedRequest, res: TypedResponse) {

        this.sessionService.logout({ req, res })

        res.json({ message: "Logout successful" })
    }

}

export default handle(Handler)