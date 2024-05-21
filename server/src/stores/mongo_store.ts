import {MongoClient, Timestamp} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const client = new MongoClient(process.env.MONGO_URL as string);

await client.connect();
export const db = client.db("astro");

type ShipOrder = ({
	type: 'aquire_contract',
	location: string,
} | {
	type: 'deliver_contract',

})[];

type ShipInstruction = ({
	type: 'move',
	location: string,
} | {
	type: 'dock',
	location: string,
} | {
	type: 'undock',
	location: string,
} | {
	type: 'refuel',
	location: string,
} | {
	type: 'buy',
	location: string,
	good: string,
	quantity: number,
} | {
	type: 'sell',
	location: string,
	good: string,
	quantity: number,
} | {
	type: 'deliver',
	location: string,
	good: string,
	quantity: number,
})[];

export type Ship = {
	symbol: string,
	nav: {
		status: 'IN_TRANSIT' | 'IN_ORBIT' | 'DOCKED',
		systemSymbol: string,
		waypointSymbol: string,
		route: {
			destination: {
				symbol: string,
				type: string,
				systemSymbol: string,
				x: number,
				y: number,
			},
			origin: {
				symbol: string,
				type: string,
				systemSymbol: string,
				x: number,
				y: number,
			},
			departureTime: string,
			arrival: string,
		}
	}
	fuel: {
		current: number,
		capacity: number,
	},
	cargo: {
		capacity: number,
		units: number,
		inventory: {
			symbol: string,
			name: string,
			description: string,
			units: number,
		}[],
	},
	orders: ShipOrder[],
	instructions: ShipInstruction[],
};

export const ops = {
	assert_indices: async () => {
		const ships = db.collection<Ship>("ships");
		await ships.createIndex({symbol: 1});
	},

	get_ship_symbols: async () => {
		const ships = db.collection<Ship>("ships");
		return (await ships.find({}).toArray()).map((x) => x.symbol);
	},

	add_ships: async (ships: Ship[]) => {
		await db.collection<Ship>("ships").insertMany(ships);
	},

	get_ship_systems: async () => {
		const ships = db.collection<Ship>("ships");
		(await ships.aggregate([
			{
				$group: {
					_id: "$nav.systemSymbol",
				}
			},
		]).toArray()).map(x => x._id);
	},

	list_ships: async () => {
		return await db.collection<Ship>("ships").find({}).toArray();
	},

	get_ship: async (symbol: string) => {
		return await db.collection<Ship>("ships").findOne({symbol}, {projection: {_id: 0}});
	},
}