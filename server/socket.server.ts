import { Sequelize } from "sequelize/types";
import { Server } from "http";

import createSocketServer from "./src/configs/socket.config";
import socketInstance from "./src/factories/socket.factories";
import socketRouters from "./src/routes/socket.routers";

const loadSocketServer = (db: Sequelize, httpServer: Server) => {
  const io = createSocketServer(httpServer);
  io.on("connection", async (socket) => {
    const socketService = socketInstance(db, socket);
    socketRouters(socketService);
  });

  return io;
};

export default loadSocketServer;
