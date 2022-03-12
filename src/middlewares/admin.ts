import { getCookie } from "cookies-next"
import { Unauthorized } from "http-errors"
import { Container } from "@/utils/di"
import { Middleware } from "@/utils/handler"
import AuthService from "@/services/auth"
import { AdminDocument } from "@/models/admin"

const authService = Container.resolve(AuthService)

export const admin: Middleware<{ admin: AdminDocument }> = async (req, res, next) => {
    try {
        const token = getCookie("token", { req, res })

        const admin = await authService.verify(token.toString())

        req.admin = admin.doc()

        next()
    } catch (err) {
        next(new Unauthorized())
    }
}
