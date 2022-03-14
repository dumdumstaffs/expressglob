import { getCookie } from "cookies-next"
import { Unauthorized } from "http-errors"
import { Container } from "@/utils/di"
import { Middleware } from "@/utils/handler"
import AuthService from "@/services/auth"
import { AdminModel } from "@/models/admin"

const authService = Container.resolve(AuthService)

export const admin: Middleware<{ admin: InstanceType<AdminModel> }> = async (req, res, next) => {
    try {
        const token = getCookie("token", { req, res })

        const admin = await authService.verify(token.toString())

        req.admin = admin.raw()

        next()
    } catch (err) {
        next(new Unauthorized())
    }
}
