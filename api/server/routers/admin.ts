import { adminProcedure, router } from "@api/server/trpc";
import { filterQuery, paginationQuery } from "@api/utils/models/query";
import AdminSchema from "@shared/schemas/admin";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const adminRouter = router({
  getAll: adminProcedure
    .input(
      z.object({
        page: paginationQuery,
        filter: filterQuery,
      }),
    )
    .query(async ({ ctx, input }) => {
      const admins = await ctx.container.admin.getAll(input.page, input.filter);

      return admins.toJSON();
    }),

  create: adminProcedure
    .input(AdminSchema.create)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.container.admin.create(input);
      if (!admin) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot create admin",
        });
      }

      return admin.toJSON();
    }),

  remove: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id === ctx.admin?.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot remove self",
        });
      }

      const safeToRemove = await ctx.container.bootstrap.safeToRemove(input.id);
      if (!safeToRemove) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot remove root admin",
        });
      }

      const id = await ctx.container.admin.remove(input.id);
      if (!id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Admin not found",
        });
      }

      return { message: "Admin removed successfully" };
    }),
});
