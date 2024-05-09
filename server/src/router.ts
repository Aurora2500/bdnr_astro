import { router } from "./trpc.js";

import { accountRouter } from "./routers/account.js";
import { shipsRouter } from "./routers/ships.js";
import { contractsRouter } from "./routers/contracts.js";
import { inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
	account: accountRouter,
	ships: shipsRouter,
	contracts: contractsRouter
})

export type AppRouter = typeof appRouter;
export type InferOutput = inferRouterOutputs<AppRouter>;