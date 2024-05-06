import dotenv from "dotenv";
import { create_store } from "redis_store.js";

import api from "spacetraders_api.js";

const main = async () => {
	dotenv.config();
	console.log(`Connecting to Redis at ${process.env.REDIS_URL}`);
	const redis_store = await create_store("redis://localhost:6379");
};

main();