import got from "got";
import { z } from "zod";

const client = got.extend({
	prefixUrl: "https://api.spacetraders.io/v2/",
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
});

const Paged = <T>(data: z.ZodType<T>) => z.object({
	data: z.array(data),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		limit: z.number(),
	})
});

const DataWrapper = <T>(data: z.ZodType<T>) => z.object({
	data,
});

const FactionList = Paged(z.object({
	name: z.string(),
	symbol: z.string(),
	description: z.string(),
	isRecruiting: z.boolean(),
}));

type FactionList = z.infer<typeof FactionList>;

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

const AgentData = DataWrapper(z.object({
	accountId: z.string(),
	credits: z.number(),
	symbol: z.string(),
	headquarters: z.string(),
	startingFaction: z.string(),
	shipCount: z.number(),
}));

const get_account = async (token: string) => {
	const res = await client.get("my/agent", {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
	const data = AgentData.parse(res.body);
	return data.data;
}

export const api = {
	list_factions,
	register_agent,
	get_account,
};