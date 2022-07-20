import { createServer } from "http";
import loadApp from "./app";
import db from "./src/configs/db.config";
import createSocketServer from "./src/configs/socket.config";
import socketInstance from "./src/factories/socket.factories";
import socketRouters from "./src/routes/socket.routers";


const app = loadApp(db)
const port = process.env.PORT || 8000;

const httpServer = createServer(app);

const io = createSocketServer(httpServer);
io.on("connection", async (socket) => {
  const socketService = socketInstance(db, socket);
  socketRouters(socketService)
  
});

httpServer.listen(port, () => {
  console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
});

export default app