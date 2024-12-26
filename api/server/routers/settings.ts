import { adminProcedure, router } from "@api/server/trpc";
import { z } from "zod";

export const settingsRouter = router({
  get: adminProcedure.query(async ({ ctx }) => {
    const settings = await ctx.container.settings.get();

    return settings.toJSON();
  }),

  update: adminProcedure
    .input(
      z.object({
        whatsapp: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.container.settings.get();
      await ctx.container.settings.update(settings.json().id, input);

      return { message: "Settings updated" };
    }),
});
