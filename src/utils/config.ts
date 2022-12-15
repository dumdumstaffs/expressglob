import { cleanEnv, num, str } from "envalid"

const env = cleanEnv(process.env, {
    PORT: num({ default: 5000 }),
    APP_SECRET: str({ default: "secret" }),
    DATABASE_URI: str({
        desc: "MongoDB database URI",
        default: "test"
    }),
    SESSION_LIFETIME: num({
        example: "90",
        desc: "Duration of sessions in days",
        default: 1
    }),
    ADMIN_EMAIL: str({ default: "test@gmail.com" }),
    ADMIN_PASS: str({ default: "secret" }),
    APP_EMAIL: str({ default: "test@gmail.com" }),
    APP_EMAIL_ALIAS: str({ default: "test@gmail.com" }),
    APP_ADDRESS: str({ default: "test" }),
    CLOUDINARY_CLOUD_NAME: str({ default: "test" }),
    CLOUDINARY_API_KEY: str({ default: "test" }),
    CLOUDINARY_API_SECRET: str({ default: "test" }),
    CLOUDINARY_PUBLIC_UPLOAD_URL: str({ default: "test" }),
    CLOUDINARY_PUBLIC_UPLOAD_PRESET: str({ default: "test" }),
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
