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
		CREATE TABLE IF NOT EXISTS market (
			location text,
			good text,
			time timestamp,
			price int,

			PRIMARY KEY(location, good, time),
			INDEX(time)

		)
	`);

	await client.execute(`
		CREATE TABLE IF NOT EXISTS sale (
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