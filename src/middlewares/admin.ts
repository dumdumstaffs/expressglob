import { Container } from "@/utils/di"
import { AppError } from "@/utils/error"
import { Middleware } from "@/utils/handler"
import AuthService from "@/services/auth"
import SessionService from "@/services/session"
import { AdminModel } from "@/models/admin"

const authService = Container.resolve(AuthService)
const sessionService = Container.resolve(SessionService)

export const admin: Middleware<{ admin?: InstanceType<AdminModel> }> = async (req, res, next) => {
    try {
        const token = sessionService.getToken({ req, res })

        const admin = await authService.verify(token.toString())

        req.admin = admin.raw()

        next()
    } catch (err) {
        next(new AppError("Unauthorized", AppError.ErrorCodes.Unauthorized))
    }
}
