import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const transactionsRouter = createTRPCRouter({
  getAllwithCodeAndVendor: publicProcedure.query(({ ctx }) => {
    const transactions =  ctx.db.transaction.findMany({
      take: 100,
      orderBy: [{transactionNumber: "desc"}],
      include: {
        vendor : {
          select : {
            description : true,
          }
        },
        gLCode : {
          select : {
            number : true,
          }
        }

      }
    })
    return transactions;
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany();
  }),
  create: privateProcedure.input(
    z.object({
      transactionNumber: z.number(),
      vendor: z.string(),
      glCode: z.string(),
      amount: z.number(),
      date: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {

    const { success } = await ratelimit.limit(authorId);
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

    const transaction = await ctx.db.transaction.create({
      data: {
      },
    });

    return transaction;
  }),
});
