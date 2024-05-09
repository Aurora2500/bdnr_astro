import got from "got";
import { z } from "zod";

import { account_objects } from "./manager.js";
import {
	FactionList,
	AgentData,
	Ships,
	Contracts,
} from "./api_types.js";

const client = got.extend({
	prefixUrl: "https://api.spacetraders.io/v2/",
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
});


const list_factions = async (): Promise<FactionList["data"]> => {
	const response = await client.get("factions");
	const result = FactionList.parse(response.body);
	return result.data;
};

const RegistrationData = z.object({
	data: z.object({
		token: z.string(),
	})
})

const register_agent = async (symbol: string, faction: string) => {
	const res = await client.post("register", {
		json: {
			faction,
			symbol,
		}
	})

	const data = RegistrationData.parse(res.body);
	return data.data.token;
}

const get_account = async () => {
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
}

const list_ships = async () => {
	const token = account_objects.token;
	if (token === null) {
		return null;
	}
	const res = await client.get("my/ships", {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
	const data = Ships.parse(res.body);
	

};

const list_contracts = async () => {
	const token = account_objects.token;
	if (token === null) {
		return null;
	}
	const res = await client.get("my/contracts", {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	});
	console.log(res.body);
	const data = Contracts.safeParse(res.body);
	if (data.success) return data.data.data;
	console.log(JSON.stringify(data.error));
	throw new Error(data.error.message)

};

export const api = {
	list_factions,
	register_agent,
	get_account,
	list_ships,
	list_contracts
};