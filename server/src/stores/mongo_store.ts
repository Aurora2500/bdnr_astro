import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const client = new MongoClient(process.env.MONGO_URL as string);

await client.connect();
export const db = client.db("astro");