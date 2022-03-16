import { NextApiRequest, NextApiResponse } from "next"
import { getCookie, removeCookies, setCookies } from "cookies-next"
import { Inject } from "@/utils/di"
import { config } from "@/utils/config"

@Inject()
export default class SessionService {
    public static SessionCookie = "token"

    public login(token: string, { req, res }: { req: NextApiRequest, res: NextApiResponse }) {
        setCookies(SessionService.SessionCookie, token, {
            secure: config.app.isProd,
            httpOnly: true,
            sameSite: "strict",
            maxAge: config.session.LIFETIME * 24 * 60 * 60 * 1000,
            req, res
        })
    }

    public getToken({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
        return getCookie(SessionService.SessionCookie, { req, res })
    }

    public logout({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
        removeCookies(SessionService.SessionCookie, { req, res })
    }
}
