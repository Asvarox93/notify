import loadApp from "./app";
import loadSocketServer from "./socket.server";
import db from "./src/configs/db.config";
import { createServer } from "http";
import routesInstance from "./src/factories/route.factories";

const routes = routesInstance(db);
const app = loadApp(routes);
db.sync();
const httpServer = createServer(app);
const io = loadSocketServer(db, httpServer);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 8000;
  httpServer.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
  });
}

export default { app, httpServer, io };
