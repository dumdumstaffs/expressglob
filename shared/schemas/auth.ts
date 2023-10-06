import { z } from "zod";

export default class AuthSchema {
  public static login = z.object({
    email: z.string().email(),
    password: z.string(),
  });
}
