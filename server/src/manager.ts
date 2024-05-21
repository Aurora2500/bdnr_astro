import { client as redis_client } from "./stores/redis_store.js"
import { Ship, ops as mongo_ops } from "./stores/mongo_store.js"
import {assert_tables, assert_tables as cassandra_assert_tables } from "./stores/cassandra_store.js"
import { api } from "./spacetraders_api.js";
import { EventEmitter } from "events";
import { Timestamp } from "mongodb";

const spacetraders_key = "API_KEY"

export const events = new EventEmitter();

export const account_objects = {
	token: await redis_client.get(spacetraders_key),
}

export const manager = {
	account_status: async () => {
		if (
			await redis_client.get(spacetraders_key) === null
			&& await api.get_account() === null)
		{
			const factions = await api.list_factions();
			return {registered: false, factions} as const;
		} else {
			return {registered: true} as const;
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

	list_ships: async () => await api.list_ships(),
	list_contracts: async () => await api.list_contracts(),
	list_systems: async () => await api.list_systems(),

	get_system: async (system: string) => await api.get_system(system),
	get_ship: async (symbol: string) => await mongo_ops.get_ship(symbol),

	accept_contract: async () => {
	}
};

const status = async () => {
	const has_key = await redis_client.get(spacetraders_key);
	if (has_key === null) {
		return "NO_KEY";
	} else {
		const account = await api.get_account();
		if (account === null) {
			return "INVALID_KEY";
		} else {
			return "OK";
		}
	}
}

const assert_ships = async () => {
	const known_ships = new Set(await mongo_ops.get_ship_symbols());
	const current_ships = await api.list_ships();
	if (current_ships === null) return;

	const missing_ships = current_ships.flatMap((ship): Ship | never[] => {
		if (known_ships.has(ship.symbol)) {
			return [];
		}
		return {
			...ship,
			orders: [],
			instructions: [],
		};
	})

	if (missing_ships.length === 0) return;

	await mongo_ops.add_ships(missing_ships);
};

const background_main = async () => {

	await cassandra_assert_tables();

	const acc_status = await status();
	if (acc_status === "INVALID_KEY") {
		await redis_client.del(spacetraders_key);
		account_objects.token = null;
		return;
	}
	if (acc_status === "NO_KEY") {
		return;
	}

	await assert_ships();
};

background_main();