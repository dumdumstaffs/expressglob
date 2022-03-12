import { config } from "@/utils/config"
import { Inject } from "@/utils/di"
import * as Jwt from "@/utils/jwt"

@Inject()
export default class JwtService {
    /**
     * Sessions
     */
    public async signSession(id: string) {
        const token = await Jwt.signToken({
            jwtid: id,
            expiresIn: `${config.session.LIFETIME} days`,
        })
        return token
    }

    public async verifySession(token: string) {
        const { jti } = await Jwt.verifyToken(token)

        return { id: jti }
    }
}
