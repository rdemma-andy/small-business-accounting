import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const transactionsRouter = createTRPCRouter({
  getAllwithCodeAndVendor: publicProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany({
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
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany();
  }),
});
