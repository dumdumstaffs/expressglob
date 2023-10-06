import { serverConfig } from "@api/utils/config";
import JWT from "jsonwebtoken";

export class Jwt {
  public static signToken(
    options: JWT.SignOptions,
    payload: Record<string, string> = {},
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      JWT.sign(payload, serverConfig.app.SECRET, options, (err, token) => {
        if (err) {
          return reject(new Error("JWT Sign Error"));
        }

        if (!token) {
          return reject(new Error("JWT Sign Error"));
        }

        resolve(token);
      });
    });
  }

  public static verifyToken(
    token: string,
  ): Promise<JWT.JwtPayload & { jti: string }> {
    return new Promise((resolve, reject) => {
      JWT.verify(token, serverConfig.app.SECRET, (err, payload) => {
        if (err) {
          return reject(new Error(err.message));
        }

        if (err || !payload) {
          return reject(new Error("JWT Verify Error"));
        }

        resolve(payload as JWT.JwtPayload & { jti: string });
      });
    });
  }
}
