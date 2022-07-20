import { Sequelize } from "sequelize/types";
import express, { Express } from "express";
import cors from "cors";
import userRouters from "./src/routes/user.routers";
import userInstance from "./src/factories/user.factories";
import messageRouters from "./src/routes/message.routers";
import messageInstance from "./src/factories/message.factories";
import roomInstance from "./src/factories/room.factories";
import roomRouters from "./src/routes/room.routers";
import authInstance from "./src/factories/auth.factories";
import authRouters from "./src/routes/auth.routers";

const loadApp = (database: Sequelize) => {
  const app: Express = express();

  const userService = userInstance(database);
  const userRouter = userRouters(userService);

  const authService = authInstance(database);
  const authRouter = authRouters(authService);

  const messageService = messageInstance(database);
  const messageRouter = messageRouters(messageService);

  const roomService = roomInstance(database);
  const roomRouter = roomRouters(roomService);

  database.sync();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/message", messageRouter);
  app.use("/api/room", roomRouter);

  return app;
};

export default loadApp;
