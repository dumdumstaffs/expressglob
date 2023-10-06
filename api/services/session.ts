import { serverConfig } from "@api/utils/config";
import { Jwt } from "@api/utils/jwt";
import { Request, Response } from "express";

type RequestResponse = { req: Request; res: Response };

export class SessionService {
  public static SessionCookie = "token";

  public get({ req }: RequestResponse) {
    return req.cookies[SessionService.SessionCookie] as string | undefined;
  }

  public set(token: string, { res }: RequestResponse) {
    res.cookie(SessionService.SessionCookie, token, {
      secure: serverConfig.app.isProd,
      httpOnly: true,
      sameSite: "strict",
      maxAge: serverConfig.session.LIFETIME * 24 * 60 * 60 * 1000,
    });
  }

  public clear({ res }: RequestResponse) {
    res.clearCookie(SessionService.SessionCookie);
  }

  public async sign(id: string) {
    const token = await Jwt.signToken({
      jwtid: id,
      expiresIn: `${serverConfig.session.LIFETIME} days`,
    });
    return token;
  }

  public async verify(token: string) {
    const { jti } = await Jwt.verifyToken(token);

    return { id: jti };
  }
}
