
require("dotenv").config();

const app = require("./src/app");
const connectdb = require("./src/db/db");
const initSocketServer = require("./src/sockets/sockets.server");
const httpServer = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectdb();

    initSocketServer(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
