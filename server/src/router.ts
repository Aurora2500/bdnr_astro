import { router } from "./trpc.js";

import { inferRouterOutputs } from "@trpc/server";

import { accountRouter } from "./routers/account.js";
import { shipsRouter } from "./routers/ships.js";
import { contractsRouter } from "./routers/contracts.js";
import { locationsRouter } from "./routers/locations.js";

export const appRouter = router({
	account: accountRouter,
	ships: shipsRouter,
	contracts: contractsRouter,
	locations: locationsRouter
})

export type AppRouter = typeof appRouter;
export type InferOutput = inferRouterOutputs<AppRouter>;