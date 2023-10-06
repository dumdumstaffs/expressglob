import { AdminResource } from "@api/models/admin";
import { adminProcedure, publicProcedure, router } from "@api/server/trpc";
import AuthSchema from "@shared/schemas/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  login: publicProcedure
    .input(AuthSchema.login)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      await ctx.container.bootstrap.initialize(email, password);

      const admin = await ctx.container.admin.findByEmail(email, password);
      if (!admin) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect email or password",
        });
      }
      const token = await ctx.container.session.sign(admin.doc().id);

      ctx.container.session.set(token, { req: ctx.req, res: ctx.res });

      return { message: "Login successful" };
    }),

  profile: adminProcedure.query(({ ctx }) => {
    const profile = new AdminResource(ctx.admin);

    return profile.toJSON();
  }),

  logout: adminProcedure.mutation(({ ctx }) => {
    ctx.container.session.clear({ req: ctx.req, res: ctx.res });

    return { message: "Logout successful" };
  }),
});
