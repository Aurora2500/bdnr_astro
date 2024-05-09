import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

import { appRouter as router } from "./trpc.js";

const app = express();

app.use(cors())

app.use(
	'/trpc',
	createExpressMiddleware({
		router,
	})
)

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

