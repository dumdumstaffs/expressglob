import { cleanEnv, num, str } from "envalid"

const env = cleanEnv(process.env, {
    PORT: num({ default: 5000 }),
    APP_SECRET: str(),
    DATABASE_URI: str({
        desc: "MongoDB database URI",
    }),
    SESSION_LIFETIME: num({
        example: "90",
        desc: "Duration of sessions in days",
    }),
    ADMIN_EMAIL: str(),
    ADMIN_PASS: str(),
    APP_EMAIL: str(),
    APP_EMAIL_ALIAS: str(),
    APP_ADDRESS: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    CLOUDINARY_PUBLIC_UPLOAD_URL: str(),
    CLOUDINARY_PUBLIC_UPLOAD_PRESET: str(),
})

export const config = {
    app: {
        PORT: env.PORT,
        SECRET: env.APP_SECRET,
        isProd: env.isProd,
        isDev: env.isDev,
        EMAIL: env.APP_EMAIL,
        EMAIL_ALIAS: env.APP_EMAIL_ALIAS,
        ADDRESS: env.APP_ADDRESS
    },
    database: {
        URI: env.DATABASE_URI,
    },
    session: {
        LIFETIME: env.SESSION_LIFETIME,
    },
    admin: {
        EMAIL: env.ADMIN_EMAIL,
        PASS: env.ADMIN_PASS
    },
    cloudinary: {
        CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
        CLOUD_API_KEY: env.CLOUDINARY_API_KEY,
        CLOUD_SECRET: env.CLOUDINARY_API_SECRET,
        PUBLIC_UPLOAD_URL: env.CLOUDINARY_PUBLIC_UPLOAD_URL,
        PUBLIC_UPLOAD_PRESET: env.CLOUDINARY_PUBLIC_UPLOAD_PRESET,
    }
}
