import { MongoClient } from "mongodb";

import { Database } from "../lib/types";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(uri); // { useNewUrlParser: true, useUnifiedTopology: true }

  const db = client.db("airbnb-typescript");

  return {
    listings: db.collection("listings"),
  };
};
