import { router, publicProcedure } from "../trpc.js";

import { manager } from "../manager.js";
import { z } from "zod";

export const shipsRouter = router({
	list: publicProcedure.query(async() => await manager.list_ships()),
	get: publicProcedure.input(z.string()).query(async ({input: symbol}) => await manager.get_ship(symbol)),
});