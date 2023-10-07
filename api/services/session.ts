import { serverConfig } from "@api/utils/config";
import { Jwt } from "@api/utils/jwt";
import { Request, Response } from "express";

type RequestResponse = { req: Request; res: Response };

export class SessionService {
  public get({ req }: RequestResponse) {
    const token = req.headers.authorization?.split("Bearer ")[1];
    return token;
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
