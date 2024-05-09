import { router, publicProcedure } from "../trpc.js";

import { manager } from "../manager.js";
import { z } from "zod";

export const contractsRouter = router({
	list: publicProcedure.query(async() => await manager.list_contracts())
});