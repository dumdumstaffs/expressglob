import { serverConfig } from "@api/utils/config";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
  isDev: !serverConfig.app.isProd,
  errorFormatter({ shape, error }) {
    const zodError =
      error.code === "BAD_REQUEST" && error.cause instanceof ZodError
        ? error.cause.flatten().fieldErrors
        : null;

    return {
      ...shape,
      message: zodError ? "" : shape.message,
      data: {
        ...shape.data,
        fieldErrors: zodError,
      },
    };
  },
});

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;

export const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const token = ctx.container.session.get({ req: ctx.req, res: ctx.res });
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });

  const { id } = await ctx.container.session.verify(token);

  const admin = await ctx.container.admin.findById(id);
  if (!admin) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      admin: admin.raw(),
    },
  });
});

export { type AppRouter } from "./routers/_app";
