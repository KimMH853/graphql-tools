import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from "typeorm";
import schema from "./api/schema.js";

// const typeDefs = `
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello, world!',
//   },
// };

createConnection().then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.log("Error connecting to database:", error);
});

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

// const server = new ApolloServer({ typeDefs, resolvers });
// const { url } = await startStandaloneServer(server, {
//   context: async ({ req }) => ({ token: req.headers.token }),
//   listen: { port: 4000 },
// });


// console.log(`🚀  Server ready at ${url}`);