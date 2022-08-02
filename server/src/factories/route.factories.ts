import { IRoutes } from "../../types/routes.types";
import { Sequelize } from "sequelize/types";
import userRouters from "../routes/user.routers";
import userInstance from "./user.factories";
import avatarRouters from "../routes/avatar.routers";
import avatarInstance from "./avatar.factories";
import messageRouters from "../routes/message.routers";
import messageInstance from "./message.factories";
import roomInstance from "./room.factories";
import roomRouters from "../routes/room.routers";
import authInstance from "./auth.factories";
import authRouters from "../routes/auth.routers";

const routesInstance = (db: Sequelize): IRoutes => {
  const userService = userInstance(db);
  const userRouter = userRouters(userService);

  const avatarService = avatarInstance(db);
  const avatarRouter = avatarRouters(avatarService);

  const authService = authInstance(db);
  const authRouter = authRouters(authService);

  const messageService = messageInstance(db);
  const messageRouter = messageRouters(messageService);

  const roomService = roomInstance(db);
  const roomRouter = roomRouters(roomService);

  const routes: IRoutes = {
    userRouter,
    avatarRouter,
    authRouter,
    messageRouter,
    roomRouter,
  };

  return routes;
};

export default routesInstance;
