import got from "got";
import { z } from "zod";

const client = got.extend({
	prefixUrl: "https://api.spacetraders.io/v2/",
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
});

const FactionList = z.object({
	data: z.array(z.object({
		name: z.string(),
		symbol: z.string(),
		description: z.string(),
		isRecruiting: z.boolean(),
	})),
});

type FactionList = z.infer<typeof FactionList>;

const list_factions = async (): Promise<FactionList["data"]> => {
	const response = await client.get("factions");
	const result = FactionList.parse(response.body);
	return result.data;
};

export const api = {
	list_factions,
};