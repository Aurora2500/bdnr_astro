import { client as redis_client } from "./stores/redis_store.js"
import { client as mongo_client } from "./stores/mongo_store.js"
import { api } from "./spacetraders_api.js";

const spacetraders_key = "API_KEY"

export const account_objects = {
	token: await redis_client.get(spacetraders_key),
}

export const manager = {
	account_status: async () => {
		const has_account = await redis_client.get(spacetraders_key) !== null;
		if (has_account) {
			return {registered: true};
		}
		else {
			const factions = await api.list_factions();
			return {registered: false, factions};
		}
	},
	balance: async () => {
		const res = await redis_client.get("balance");
		if (res !== null) {
			return parseFloat(res);
		}
		const account = await api.get_account();
		if (account === null) return null;
		redis_client.set("balance", account.credits.toString());
		return account.credits;
	},
	register: async (symbol: string, faction: string) => {
		const token = await api.register_agent(symbol, faction);
		redis_client.set(spacetraders_key, token);
		account_objects.token = token;
	},

	list_ships: async () => {
		
	},

	list_contracts: async () => await api.list_contracts(),
}