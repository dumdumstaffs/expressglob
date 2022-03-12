import { removeCookies } from "cookies-next"
import { Controller, handle, Route } from "@/utils/handler";
import { admin } from "@/middlewares/admin";
import { TypedRequest, TypedResponse } from "@/types/request";

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