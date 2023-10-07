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

      return { message: "Login successful", token };
    }),

  profile: adminProcedure.query(({ ctx }) => {
    const profile = new AdminResource(ctx.admin);

    return profile.toJSON();
  }),
});
