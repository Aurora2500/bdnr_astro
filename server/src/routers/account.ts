import { router, publicProcedure } from "../trpc.js";

import { events, manager } from "../manager.js";
import { z } from "zod";
import { observable } from "@trpc/server/observable";

export const accountRouter = router({
	balance: publicProcedure.query(async () => await manager.balance()),
	status: publicProcedure.query(async () => await manager.account_status()),
	register: publicProcedure.input(z.object({
		symbol: z.string(),
		faction: z.string(),
	})).mutation(async ({input: {symbol, faction}}) => await manager.register(symbol, faction)),
});