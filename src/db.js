// This file connects to the remote prisma DB and gives us the ability to query it with JS
const { Prisma } = require('prisma-binding');

// THIS ISN'T IN WESBOS - but you will need it to find the endpoint env
require('dotenv').config();

const db = new Prisma({
  //where are your types/schema
  // typeDefs: 'src/generated/prisma.graphql',
  typeDefs: __dirname + "/schema_prep.graphql",
  // where does the db live
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = db;