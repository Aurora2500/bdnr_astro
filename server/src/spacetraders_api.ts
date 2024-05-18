import got from "got";
import { z } from "zod";

import { account_objects } from "./manager.js";
import {
	FactionList,
	RegistrationData,
	AgentData,
	Ships,
	Systems,
	ContractList,
	AcceptContract,
	WaypointList,
} from "./api_types.js";

const client = got.extend({
	prefixUrl: "https://api.spacetraders.io/v2/",
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
});

const handle_error = <T>(parser: z.ZodType<T>, body: string): T => {
const data = parser.safeParse(body);
if (data.success) return data.data;
throw new Error(data.error.message)
}

export const api = {

	list_factions: async (): Promise<FactionList["data"]> => {
		const response = await client.get("factions");
		const result = FactionList.parse(response.body);
		return result.data;
	},

	register_agent: async (symbol: string, faction: string) => {
		const res = await client.post("register", {
			json: {
				faction,
				symbol,
			}
		})

		const data = RegistrationData.parse(res.body);
		return data.data.token;
	},

	get_account: async () => {
		const token = account_objects.token;
		if (token === null) {
			return null;
		}
		const res = await client.get("my/agent", {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		const data = AgentData.parse(res.body);
		return data.data;
	},

	list_ships: async () => {
		const token = account_objects.token;
		if (token === null) {
			return null;
		}
		const res = await client.get("my/ships", {
			headers: {
				"Authorization": `Bearer ${token}`
			},
		})
		const data = Ships.parse(res.body);
		return data.data
	},

	list_contracts: async () => {
		const token = account_objects.token;
		if (token === null) {
			return null;
		}
		const res = await client.get("my/contracts", {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
		const data = ContractList.safeParse(res.body);
		if (data.success) return data.data.data;
		throw new Error(data.error.message)
	},

	accept_contract: async (contract: string) => {
		const token = account_objects.token;
		if (token === null) {
			return null;
		}
		const res = await client.post(`my/contracts/${contract}/accept`, {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
		const data = AcceptContract.safeParse(res.body);
		if (data.success) return data.data;
		throw new Error(data.error.message)
	},

	list_systems: async () => {
		const res = await client.get("systems");
		const data = Systems.safeParse(res.body);
		if (data.success) return data.data.data;
		throw new Error(data.error.message)
	},

	get_system: async (system: string) => {
		const token = account_objects.token;
		if (token === null) {
			return null;
		}

		const res = await client.get(`systems/${system}/waypoints`, {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});

		const data = WaypointList.safeParse(res.body);
		if (data.success) return data.data.data;
		console.error(data.error.message)
		throw new Error(data.error.message)
	},

}