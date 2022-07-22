import { createServer } from "http";
import loadApp from "./app";
import db from "./src/configs/db.config";
import routesInstance from "./src/factories/route.factories";
import createSocketServer from "./src/configs/socket.config";
import socketInstance from "./src/factories/socket.factories";
import socketRouters from "./src/routes/socket.routers";

const routes = routesInstance(db);
const app = loadApp(routes);

db.sync();

const port = process.env.PORT || 8000;

const httpServer = createServer(app);

const io = createSocketServer(httpServer);
io.on("connection", async (socket) => {
  const socketService = socketInstance(db, socket);
  socketRouters(socketService);
});

if(process.env.NODE_ENV !== "test"){
  httpServer.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
  });
}
export default app;
