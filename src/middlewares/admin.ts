import Cookies from "cookies"
import { Unauthorized } from "http-errors"
import { Container } from "@/utils/di"
import { Middleware } from "@/utils/handler"
import AuthService from "@/services/auth"
import { AdminDocument } from "@/models/admin"

const authService = Container.resolve(AuthService)

export const admin: Middleware<{ admin: AdminDocument }> = async (req, res, next) => {
    try {
        const cookies = new Cookies(req, res)
        const token = cookies.get("token")

        const admin = await authService.verify(token)

        req.admin = admin.doc()

        next()
    } catch (err) {
        next(new Unauthorized())
    }
}
