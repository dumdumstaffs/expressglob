import { z } from "zod";

export default class AdminSchema {
  public static create = z
    .object({
      email: z.string().email(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: "Passwords must match",
        path: ["password"],
      },
    );
}
