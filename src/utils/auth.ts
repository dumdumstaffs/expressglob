import { IncomingMessage, ServerResponse } from "http"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { Container } from "@/utils/di"
import AuthService from "@/services/auth"
import { getCookie } from "cookies-next"
import { Admin } from "@/types/admin"

const authService = Container.resolve(AuthService)

export const getAuth = async (req: IncomingMessage, res: ServerResponse): Promise<Admin | null> => {
    try {
        const token = getCookie("token", { req, res })

        const admin = await authService.verify(token.toString())

        return admin.get()
    } catch (e) {
        return null
    }
}

export type WithServerSideAuthOptions = {
    mode?: "authenticated" | "guest"
    redirect?: boolean
    redirectTo?: string
}

export type AdminReturnType<Options extends WithServerSideAuthOptions> =
    Options["mode"] extends "guest"
    ? // -----------------------
    // guest is expected
    Options["redirect"] extends false
    ? Admin | null // no redirect if not guest => admin can be guest or authenticated
    : null // redirect if not guest => admin is always guest
    : // -----------------------
    // authenticated user is expected
    Options["redirect"] extends false
    ? Admin | null // no redirect if not authenticated => admin can be guest or authenticated
    : Admin //redirect if not authenticated => admin is always authenticated

const DefaultOptions = {
    mode: "authenticated",
    redirect: true,
    redirectTo: "/",
} as const

export type WithServerSideAuthProps<Props, Options = typeof DefaultOptions> = (
    ctx: GetServerSidePropsContext,
    user: AdminReturnType<Options>,
    // client: AxiosInstance
) => Promise<GetServerSidePropsResult<Props | undefined>>

export const withServerSideAuth =
    <P, O extends WithServerSideAuthOptions>(
        getServerSidePropsFunction: WithServerSideAuthProps<P, O>,
        options?: O
    ) =>
        async (ctx: GetServerSidePropsContext) => {
            const mode = options?.mode ?? DefaultOptions.mode
            const redirect = options?.redirect ?? DefaultOptions.redirect
            const redirectTo = options?.redirectTo ?? DefaultOptions.redirectTo

            const admin = await getAuth(ctx.req, ctx.res)

            if (admin) {
                if (mode === "guest" && redirect) {
                    // admin found
                    // but expected to find guest
                    // and should redirect
                    return {
                        redirect: {
                            destination: redirectTo,
                            permanent: false,
                        },
                    }
                } else {
                    // admin found
                    // either expected to find admin
                    // or should not redirect if expected guest
                    return await getServerSidePropsFunction(
                        ctx,
                        admin as AdminReturnType<O>
                    )
                }
            } else {
                if (mode === "authenticated" && redirect) {
                    // admin not found
                    // but expected to find admin
                    // and should redirect if not found
                    return {
                        redirect: {
                            destination: redirectTo,
                            permanent: false,
                        },
                    }
                } else {
                    // user not found
                    // and did not expect to find user
                    // or should not redirect if user was expected
                    // or should not redirect if admin user expected
                    return await getServerSidePropsFunction(
                        ctx,
                        admin as AdminReturnType<O>,
                    )
                }
            }
        }
