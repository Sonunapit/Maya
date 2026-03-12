require("dotenv").config();
const app = require('./src/app')
const connectdb = require("./src/db/db")
const initSocketServer = require('./src/sockets/sockets.server')
const httpServer = require("http").createServer(app);

connectdb()
initSocketServer(httpServer);

httpServer.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})