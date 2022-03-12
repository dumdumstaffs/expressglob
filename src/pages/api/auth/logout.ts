import Cookies from "cookies"
import { Controller, handle, Route } from "@/utils/handler";
import { admin } from "@/middlewares/admin";
import { TypedRequest, TypedResponse } from "@/types/request";

@Controller(admin)
class Handler {
    constructor() { }

    @Route()
    public async post(req: TypedRequest, res: TypedResponse) {

        const cookies = new Cookies(req, res)
        cookies.set("token")

        res.json({ message: "Logout successful" })
    }

}

export default handle(Handler)