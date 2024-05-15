import { router, publicProcedure } from "../trpc.js";

export const locationsRouter = router({
	systems: publicProcedure.query(async () => {
		
	})
});