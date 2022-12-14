// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.NODE_ENV !== "production" && require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";

import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.start().then(() => {
    server.applyMiddleware({ app, path: "/api" });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!!`);
  });

  const listings = await db.listings.find({}).toArray();

  console.log(listings);
};

mount(express());
