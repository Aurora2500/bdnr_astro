import { router, publicProcedure } from "../trpc.js";
import { manager } from "../manager.js";
import { z } from "zod";

export const locationsRouter = router({
	systems: publicProcedure.query(async () => await manager.list_systems() ),
	system: publicProcedure.input(z.string()).query(async ({input:system}) => manager.get_system(system)),
});