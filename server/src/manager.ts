import { client as redis_client } from "./stores/redis_store.js"
import { api } from "./spacetraders_api.js";

const spacetraders_key = "API_KEY"

export const manager = {
	has_account: async () => {
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
		if (res === null) {
			return null;
		}
		return parseFloat(res);
	}

}