const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');


const current_dirname = path.resolve();
console.log(current_dirname);
const typeDefs = loadFilesSync(path.join(__dirname, './api/**/*.graphql'));
const resolvers = loadFilesSync(path.join(__dirname, './api/**/*.js'));

// console.log(typeDefs);
// console.log(resolvers);

// // Define your schema using GraphQL schema language
// const typeDefs = `
//   type Query {
//     hello: String
//   }
// `;

// // Define your resolvers
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// };

// Create your executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const server = new ApolloServer({
  schema,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
