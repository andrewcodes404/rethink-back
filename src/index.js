//make sure our variables are avaiolable
require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
//the fn we just created
const createServer = require('./createServer')

//grab the db instance
// const db = require('./db')

//run the server fn
const server = createServer()

// Epress MiddleWare to handle the the cookie with the JWT in it
//allows us to acces the cookies in a formatted object
server.express.use(cookieParser())

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET_FOR_JWT)
        // put the userId onto the req for future requests to access
        req.userId = userId
    }
    next()
})

var allowedOrigin1 = process.env.FRONTEND_URL
var allowedOrigin2 = process.env.FRONTEND_URL2

//using cors here to protect our endpoints
server.start(
    {
        cors: {
            credentials: true,
            origin: [allowedOrigin1, allowedOrigin2],
        },
    },
    // a fn that runs when the server spins
    deets => {
        console.log(
            `Server is now running on port http://localhost:${deets.port}`
        )
    }
)
