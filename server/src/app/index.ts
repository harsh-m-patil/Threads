import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser"; // Needed for handling POST requests
import { User } from "./user";
import cors from "cors";
import { GraphQLContext } from "../interfaces";
import JWTService from "../services/jwt";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  // Define GraphQL schema
  // NOTE: ! means required
  const typeDefs = `
    ${User.types}

    type Query {
      ${User.queries}
    }
  `;

  // Define resolvers
  const resolvers = {
    Query: {
      ...User.resolvers.queries,
    },
  };

  // Initialize Apollo Server
  const graphqlServer = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await graphqlServer.start();

  // Use middleware for parsing JSON and connecting to Apollo Server
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
                req.headers.authorization.split("Bearer ")[1],
              )
            : undefined,
        };
      },
    }),
  );

  return app;
}
