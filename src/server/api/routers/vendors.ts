import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const vendorsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string()}))
    .query(({ctx, input}) => {
    const vendor =  ctx.db.vendor.findUnique({
      where: { id: input.id },
      include: {
        gLCode: {
          select : {
            number: true,
          }
        }
      }
    });

    if (!vendor) throw new TRPCError({ code: "NOT_FOUND"});

    return vendor;
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.vendor.findMany({
      include: {
        gLCode: {
          select : {
            number : true,
          }
        }
      }
    });
  }),
});
