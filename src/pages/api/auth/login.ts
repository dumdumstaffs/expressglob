import { setCookies } from "cookies-next"
import { config } from "@/utils/config";
import { Controller, handle, Route } from "@/utils/handler";
import Bootstrap from "@/services/bootstrap";
import AuthService from "@/services/auth";
import AuthSchema from "@/schemas/misc/auth";
import { TypedRequest, TypedResponse } from "@/types/request";

@Controller()
class Handler {
    constructor(private readonly authService: AuthService, private readonly bootstrap: Bootstrap) { }

    @Route(AuthSchema.login)
    public async post(req: TypedRequest<typeof AuthSchema.login, { trackingId: string }>, res: TypedResponse) {
        // await new Promise(r => setTimeout(r, 4000))

        const { email, password } = req.validated

        await this.bootstrap.initialize(email, password)
        const token = await this.authService.authenticate(email, password)

        setCookies("token", token, {
            secure: config.app.isProd,
            httpOnly: true,
            sameSite: "strict",
            maxAge: config.session.LIFETIME * 24 * 60 * 60 * 1000,
            req, res
        })

        res.json({ message: "Login successful" })
    }

}

export default handle(Handler)