import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
