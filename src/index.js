//make sure our variables are avaiolable
require('dotenv').config();

//the fn we just created
const createServer = require('./createServer');

//grab the db instance
const db = require('./db');

//run the server fn
const server = createServer();

//using cors here to protect our endpoints
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
  },
  // a fn that runs when the server spins
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);