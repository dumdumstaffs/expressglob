import { Controller, handle, Route } from "@/utils/handler";
import { TypedRequest, TypedResponse } from "@/types/request";
import AuthService from "@/services/auth";
import SessionService from "@/services/session";
import Bootstrap from "@/services/bootstrap";
import AuthSchema from "@/schemas/misc/auth";

@Controller()
class Handler {
    constructor(
        private readonly authService: AuthService,
        private readonly sessionService: SessionService,
        private readonly bootstrap: Bootstrap
    ) { }

    @Route(AuthSchema.login)
    public async post(req: TypedRequest<typeof AuthSchema.login, { trackingId: string }>, res: TypedResponse) {
        // await new Promise(r => setTimeout(r, 4000))

        const { email, password } = req.validated

        await this.bootstrap.initialize(email, password)
        const token = await this.authService.authenticate(email, password)

        this.sessionService.login(token, { req, res })

        res.json({ message: "Login successful" })
    }

}

export default handle(Handler)