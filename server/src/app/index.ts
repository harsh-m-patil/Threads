import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser"; // Needed for handling POST requests

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());

  // Define GraphQL schema
  const typeDefs = `
    type Query {
      sayHello: String
    }
  `;

  // Define resolvers
  const resolvers = {
    Query: {
      sayHello: () => "Hello World",
    },
  };

  // Initialize Apollo Server
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await graphqlServer.start();

  // Use middleware for parsing JSON and connecting to Apollo Server
  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
