import { IRoutes } from "./types/routes.types";
import express, { Express } from "express";
import cors from "cors";

const loadApp = (routes: IRoutes) => {
  const app: Express = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", routes.authRouter);
  app.use("/api/users", routes.userRouter);
  app.use("/api/message", routes.messageRouter);
  app.use("/api/room", routes.roomRouter);

  return app;
};

export default loadApp;
