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
      vendorId: z.string(),
      glCodeId: z.string(),
      amount: z.number(),
      date: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {

    const ifVendorExists = await ctx.db.vendor.findFirst({
      where: { id : input.vendorId },
    })

    const ifGLCodeExists = await ctx.db.generalLedgerCode.findFirst({
      where: { id : input.glCodeId },
    })

    if(ifVendorExists || !ifGLCodeExists) throw new TRPCError({ code: "NOT_FOUND"});

    const transaction = await ctx.db.transaction.create({
      data: {
        transactionNumber: input.transactionNumber,
        vendor: {
          connect: {id: input.vendorId },
        },
        gLCode: {
          connect: {id: input.glCodeId},
        },
        amount: input.amount,
        date: input.date,
      },
    });

    return transaction;
  }),
});
