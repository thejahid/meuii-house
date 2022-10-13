import { MongoClient } from "mongodb";

import { Database } from "../lib/types";

const username = "";
const password = "";
const cluster = "";

const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(uri); // { useNewUrlParser: true, useUnifiedTopology: true }

  const db = client.db("airbnb-typescript");

  return {
    listings: db.collection("listings"),
  };
};
