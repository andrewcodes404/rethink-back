const { GraphQLServer } = require("graphql-yoga");

// import the resolvers
const Mutation = require("./resolvers/Mutations");
const Query = require("./resolvers/Queries");

// grab the db
const db = require("./db");
// Create the GraphQL Yoga Server
function createServer() {
  // console.log('createServer() running 🏃‍♂️');
  return new GraphQLServer({
    // ANOTHE SCHEMA 😱 see notes below
    // typeDefs: 'src/schema.graphql',
    typeDefs: __dirname + "/schema.graphql",
    // the above schema will then be matched with an object with the resolvers in
    resolvers: {
      Mutation,
      Query
    },
    // stops some error
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    // access the db from the resolvers through 'context'
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;