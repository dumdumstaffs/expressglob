import JWT from "jsonwebtoken"
import { config } from "@/utils/config"
import { CustomError } from "@/utils/error"

export const signToken = (
    options: JWT.SignOptions,
    payload: Record<string, string> = {}
): Promise<string> => {
    return new Promise((resolve, reject) => {
        JWT.sign(payload, config.app.SECRET, options, (err, token) => {
            if (err) {
                return reject(new CustomError("Sign Error", 500, true))
            }

            if (!token) {
                return reject(new CustomError("Sign Error", 500, true))
            }

            resolve(token)
        })
    })
}

export const verifyToken = (token: string): Promise<JWT.JwtPayload> => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, config.app.SECRET, (err, payload) => {
            if (err) {
                return reject(new CustomError(err.message, 400, true))
            }

            if (err || !payload) {
                return reject(new CustomError("Verify Error", 400, true))
            }

            resolve(payload as JWT.JwtPayload)
        })
    })
}
