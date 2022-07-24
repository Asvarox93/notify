import { Sequelize } from "sequelize/types";
import { Express } from "express";
import { createServer } from "http";
import createSocketServer from "./src/configs/socket.config";
import socketInstance from "./src/factories/socket.factories";
import socketRouters from "./src/routes/socket.routers";

const loadServer = (db: Sequelize, app: Express) => {
  const httpServer = createServer(app);

  const io = createSocketServer(httpServer);
  io.on("connection", async (socket) => {
    const socketService = socketInstance(db, socket);
    socketRouters(socketService);
  });

  if (process.env.NODE_ENV !== "test") {
    const port = process.env.PORT || 8000;
    httpServer.listen(port, () => {
      console.log(
        `⚡️[SERVER]: Server is running at https://localhost:${port}`
      );
    });
  }

  return io;
};

export default loadServer;
