/* eslint-disable import/order */
// organize-imports-ignore
// NOTE: reflect-metadata must be imported at the top!
import "reflect-metadata";

import { createGqlContext } from "@/graphql/context";
import { resolvers } from "@/graphql/schema";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { buildSchema, NonEmptyArray, MiddlewareFn } from "type-graphql-v2-fork";
import { ApolloServer } from "apollo-server-micro";
import { Model, Document } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next();
  if (Array.isArray(result)) {
    return result.map((item) => (item instanceof Model ? convertDocument(item) : item));
  }
  if (result instanceof Model) {
    return convertDocument(result);
  }
  return result;
};

function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject();
  const DocumentClass = getClassForDocument(doc)!;
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
  return convertedDocument;
}

declare const global: NodeJS.Global & {
  apolloServerHandler?: ReturnType<ApolloServer["createHandler"]>;
};

const getApolloServerHandler = async () => {
  if (!global.apolloServerHandler) {
    if (!resolvers?.length) throw new Error("No resolvers");
    const apolloServer = new ApolloServer({
      context: createGqlContext,
      schema: await buildSchema({
        resolvers: (resolvers as unknown) as NonEmptyArray<CallableFunction>,
        emitSchemaFile: {
          path: `${process.env.BASE_DIR}/graphql/schema.gql`,
        },
        globalMiddlewares: [TypegooseMiddleware],
        validate: false,
      }),
      debug: process.env.NODE_ENV !== "production",
      introspection: true,
    });
    await apolloServer.start();
    global.apolloServerHandler = apolloServer.createHandler({ path: "/api/graphql" });
  }
  return global.apolloServerHandler;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  return (await getApolloServerHandler())(req, res);
};

export default handler;

export const config: PageConfig = {
  api: {
    // Delegate body parsing to Apollo Server Micro.
    bodyParser: false,
  },
};
