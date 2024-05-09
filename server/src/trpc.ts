import { initTRPC } from "@trpc/server";
import { manager } from "./manager.js";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
	balance: publicProcedure.query(async () => await manager.balance()),
	account: publicProcedure.query(async () => await manager.has_account())
})

export type AppRouter = typeof appRouter;