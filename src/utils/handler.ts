import { AnyObjectSchema } from "yup"
import { NextApiRequest, NextApiResponse } from "next"
import nc, { Middleware as NextConnectMiddleware } from "next-connect"
import { Container } from "@/utils/di"
import { ensureArray, arrayIncludes } from "@/utils/helpers"
import { connectDb } from "@/lib/db"
import { validate } from "@/middlewares/validate"
import { Error } from "@/middlewares/error"
import { NoMatch } from "@/middlewares/no-match"

export type Middleware<Req = {}, Res = {}> = NextConnectMiddleware<NextApiRequest & Req, NextApiResponse & Res>

export type Handler<T> = new (...p: any[]) => T

export type RouteProps = {
    schema?: AnyObjectSchema | null,
    middleware?: Middleware | Middleware[]
}

export type RouteMeta = Record<Method, RouteProps>

export const Methods = ["get", "post", "put", "patch", "delete"] as const

export type Method = typeof Methods[number]

export function Controller(
    middleware?: RouteProps["middleware"]
): ClassDecorator {
    return function (target) {
        if (middleware) {
            Reflect.defineMetadata("middleware", middleware, target)
        }

        // set routes to empty array in a case where controller has no methods
        if (!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", {}, target)
        }
    }
}

export function Route(
    this: any,
    schema?: RouteProps["schema"],
    middleware?: RouteProps["middleware"]
) {
    return function (
        this: any,
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Register controller method
        // set routes to empty empty object if not set to prevent error while accessing
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", {}, target.constructor)
        }

        // get stored routes
        const routes = Reflect.getMetadata("routes", target.constructor) as RouteMeta

        // add new route
        if (arrayIncludes(propertyKey, Methods)) {
            routes[propertyKey] = { schema, middleware }
        }

        // update stored routes
        Reflect.defineMetadata("routes", routes, target.constructor)

        // Handle error handling logic
        // get snapshot of controller method
        const originalMethod = descriptor.value

        // wrap controller method with error handler
        descriptor.value = async function (...args: any[]) {
            return await originalMethod.apply(this, args)
        }

        return descriptor
    }
}

type HandleOptions = {
    db: boolean
}

export const handle = <T>(Handler: Handler<T>, options?: HandleOptions) => {
    const handleOptions = {
        db: options ? options.db : true
    }

    // router instance
    const router = nc<NextApiRequest, NextApiResponse>({
        onError: Error,
        onNoMatch: NoMatch
    })

    // boot middlewares
    if (handleOptions.db) {
        connectDb()
    }

    // reflect routes and middlewares
    const routes: RouteMeta = Reflect.getMetadata("routes", Handler)
    const middleware: Middleware | Middleware[] = Reflect.getMetadata("middleware", Handler)

    // resolve handler from class
    const handler = Container.resolve(Handler)

    // apply global middlewares
    if (middleware) router.use(...ensureArray(middleware))

    Methods.forEach((method) => {
        if (!routes[method]) return

        const middlewareChain: Middleware[] = []

        if (routes[method].schema) middlewareChain.push(validate(routes[method].schema))
        if (routes[method].middleware) middlewareChain.push(...ensureArray(routes[method].middleware))

        const handlerFn = (req: NextApiRequest, res: NextApiResponse) => handler[method](req, res)

        router[method](...middlewareChain, handlerFn)
    })

    return router
}
