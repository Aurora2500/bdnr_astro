import { z } from "zod";

export const Paged = <T>(data: z.ZodType<T>) => z.object({
	data: z.array(data),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		limit: z.number(),
	})
});

export const DataWrapper = <T>(data: z.ZodType<T>) => z.object({
	data,
});

export const FactionList = Paged(z.object({
	name: z.string(),
	symbol: z.string(),
	description: z.string(),
	isRecruiting: z.boolean(),
}));

export type FactionList = z.infer<typeof FactionList>;

export const AgentData = DataWrapper(z.object({
	accountId: z.string(),
	credits: z.number(),
	symbol: z.string(),
	headquarters: z.string(),
	startingFaction: z.string(),
	shipCount: z.number(),
}));


export const Ships = Paged(z.object({
	symbol: z.string(),
	
}));

export const Contracts = Paged(z.object({
	id: z.string(),
	type: z.string(),
	terms: z.object({
		deadline: z.string(),
		deliver: z.object({
			tradeSymbol: z.string(),
			destinationSymbol: z.string(),
			unitsRequired: z.number(),
			unitsFulfilled: z.number(),
		}).array(),
		payment: z.object({
			onAccepted: z.number(),
			onFulfilled: z.number(),
		}),
	}),
}));