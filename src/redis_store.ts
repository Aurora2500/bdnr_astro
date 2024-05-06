import { type RedisClientType, createClient } from "redis";

export type RedisStore = {
	client: ReturnType<typeof createClient>;
	get: (key: string) => Promise<string | null>;
	set: (key: string, value: string) => Promise<void>;
}

export const create_store = async (url: string) => {
	const client = createClient({url});
	await client.connect();

	const store: RedisStore = {
		client,
		get: async (key: string) => {
			return await client.get(key);
		},
		set: async (key: string, value: string) => {
			await client.set(key, value);
		}
	};

	return store;
}
