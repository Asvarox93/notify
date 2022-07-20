import { Socket } from "socket.io/dist/socket";
import {
  IAuthController,
  IMessageController,
  IRoomController,
  ISocketController,
  IUserController,
} from "./controllers.types";
import { ClientToServerEvents } from "./socket.types";

export type IUserService = IUserController;

export interface ISocketService extends ISocketController {
  getSocket(): Socket<ClientToServerEvents>;
}

export type IRoomService = IRoomController;
export type IMessageService = IMessageController;
export type IAuthService = IAuthController;