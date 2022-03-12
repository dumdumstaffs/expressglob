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
    ADMIN_PASS: str()
})

export const config = {
    app: {
        PORT: env.PORT,
        SECRET: env.APP_SECRET,
        isProd: env.isProd,
        isDev: env.isDev,
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
    }
}
