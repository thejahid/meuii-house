import { ObjectId } from "mongodb";

import { Database } from "./../lib/types";
import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listings: async (_root: undefined, _args: {}, { db }: { db: Database }) => {
      return await db.listings.find({}).toArray();
    },
  },

  Mutation: {
    deleleListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ) => {
      const deleteResponse = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResponse.value) {
        throw new Error("Failed  to delete listing!");
      }

      return deleteResponse.value;
    },
  },
};
