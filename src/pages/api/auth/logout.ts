import { removeCookies } from "cookies-next"
import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import { admin } from "@/middlewares/admin";

@Controller(admin)
class Handler {
    constructor() { }

    @Route()
    public async post(req: TypedRequest, res: TypedResponse) {

        removeCookies("token", { req, res })

        res.json({ message: "Logout successful" })
    }

}

export default handle(Handler)