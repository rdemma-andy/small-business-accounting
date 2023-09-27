import { createTRPCRouter } from "~/server/api/trpc";
import { transactionsRouter } from "./routers/transactions";
import { generalLedgerCodesRouter } from "./routers/generalLedgerCodes";
import { vendorsRouter } from "./routers/vendors";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transactions: transactionsRouter,
  vendors: vendorsRouter,
  generalLedgerCodes: generalLedgerCodesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
