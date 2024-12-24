import { adminProcedure, router } from "@api/server/trpc";
import { z } from "zod";

export const mailRouter = router({
  send: adminProcedure
    .input(
      z.object({
        receiver: z.string(),
        subject: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.container.mail.send({
        template: "custom",
        receiver: input.receiver,
        subject: input.subject,
        locals: {
          lines: ctx.container.mail.parseLines(input.body),
        },
      });

      return { message: "Email sent successfully" };
    }),
});
