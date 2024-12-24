import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .default("5000")
    .transform((p) => parseInt(p)),
  APP_SECRET: z.string(),
  DATABASE_URI: z.string(),
  SESSION_LIFETIME: z.string().transform((p) => parseInt(p)),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASS: z.string(),
  APP_NAME: z.string(),
  APP_EMAIL: z.string(),
  APP_PASS: z.string(),
  APP_DOMAIN: z.string(),
  APP_ADDRESS: z.string(),
  API_BASE: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_PUBLIC_UPLOAD_URL: z.string(),
  CLOUDINARY_PUBLIC_UPLOAD_PRESET: z.string(),
});

const validated = envSchema.safeParse(process.env);

if (!validated.success) {
  console.error("Invalid environment variables:", validated.error.issues);
  process.exit(1);
}

const env = validated.data;

export const serverConfig = {
  app: {
    isProd: process.env.NODE_ENV === "production",
    PORT: env.PORT,
    SECRET: env.APP_SECRET,
    NAME: env.APP_NAME,
    EMAIL: env.APP_EMAIL,
    PASS: env.APP_PASS,
    DOMAIN: env.APP_DOMAIN,
    ADDRESS: env.APP_ADDRESS,
  },
  database: {
    URI: env.DATABASE_URI,
  },
  session: {
    LIFETIME: env.SESSION_LIFETIME,
  },
  admin: {
    EMAIL: env.ADMIN_EMAIL,
    PASS: env.ADMIN_PASS,
  },
  cloudinary: {
    CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
    CLOUD_API_KEY: env.CLOUDINARY_API_KEY,
    CLOUD_SECRET: env.CLOUDINARY_API_SECRET,
    PUBLIC_UPLOAD_URL: env.CLOUDINARY_PUBLIC_UPLOAD_URL,
    PUBLIC_UPLOAD_PRESET: env.CLOUDINARY_PUBLIC_UPLOAD_PRESET,
  },
};
