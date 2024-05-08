import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient();
await client.connect();

export const get = async (key: string) => {
	return await client.get(key);
};

