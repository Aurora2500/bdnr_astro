import cassandra from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

export const client = new cassandra.Client({
	contactPoints: [process.env.CASSANDRA_URL as string],
	localDataCenter: "datacenter1",
	keyspace: "astro"
})

await client.connect();

export const assert_tables = async() => {
	await client.execute(`
		CREATE TABLE IF NOT EXISTS systems (
			symbol text PRIMARY KEY,
			type text,
			waypoints set<text>,
			factions set<text>,
		)
	`);

	await client.execute(`
		CREATE TABLE IF NOT EXISTS waypoints (
			symbol text PRIMARY KEY,
			type text,
			system text,
			traits set<text>,
		)
	`);

	await client.execute(`
		CREATE TABLE IF NOT EXISTS markets (
			location text,
			good text,
			time timestamp,
			price int,

			PRIMARY KEY(location, good, time),
		)
	`);
	await client.execute(`
			CREATE INDEX IF NOT EXISTS ON markets (time)
	`)

	await client.execute(`
		CREATE TABLE IF NOT EXISTS sales (
			location text,
			good text,
			time timestamp,
			quantity int,
			price int,
			ship text,

			PRIMARY KEY(location, good, time),
		)
	`)

}