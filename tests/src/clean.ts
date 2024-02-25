import { MongoClient } from "mongodb";
import "dotenv/config";


async function main(c?: MongoClient) {
  const client = c || new MongoClient(process.env.MONGODB_URI!);

  await client.connect();

  await client.db("test").collection("users").deleteMany({});

}



export { main as cleanup };
