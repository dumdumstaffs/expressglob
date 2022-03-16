import JWT from "jsonwebtoken"
import { config } from "@/utils/config"
import { AppError } from "@/utils/error"

export default class Jwt {
    public static signToken(options: JWT.SignOptions, payload: Record<string, string> = {}): Promise<string> {
        return new Promise((resolve, reject) => {
            JWT.sign(payload, config.app.SECRET, options, (err, token) => {
                if (err) {
                    return reject(new AppError("Sign Error", 500, true))
                }

                if (!token) {
                    return reject(new AppError("Sign Error", 500, true))
                }

                resolve(token)
            })
        })
    }

    public static verifyToken(token: string): Promise<JWT.JwtPayload> {
        return new Promise((resolve, reject) => {
            JWT.verify(token, config.app.SECRET, (err, payload) => {
                if (err) {
                    return reject(new AppError(err.message, AppError.ErrorCodes.BadRequest, true))
                }

                if (err || !payload) {
                    return reject(new AppError("Verify Error", AppError.ErrorCodes.BadRequest, true))
                }

                resolve(payload as JWT.JwtPayload)
            })
        })
    }
}
