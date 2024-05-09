import { router, publicProcedure } from "./trpc.js";
import { manager } from "./manager.js";
import { z } from "zod";

export const appRouter = router({
	balance: publicProcedure.query(async () => await manager.balance()),
	account: publicProcedure.query(async () => await manager.has_account()),
	register: publicProcedure.input(z.object({
		symbol: z.string(),
		faction: z.string(),
	})).mutation(async ({input: {symbol, faction}}) => await manager.register(symbol, faction)),
})

export type AppRouter = typeof appRouter;