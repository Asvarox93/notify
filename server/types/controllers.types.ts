import {
  chatJoinAttributes,
  chatMessageAttributes,
  ServerToClientEvents,
} from "./sockets.types";
import { Request, Response } from "express";
import { Socket } from "socket.io/dist/socket";

export interface IUserController {
  create(req: Request, res: Response): void;
  findById(req: Request, res: Response): void;
  findAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  remove(req: Request, res: Response): void;
}

export interface ISocketController {
  getSocket(): Socket<ServerToClientEvents>;
  joinRoom(data: chatJoinAttributes): void;
  sendMessage(data: chatMessageAttributes): void;
}

export interface IRoomController {
  fetchRoom(req: Request, res: Response): void;
}

export interface IMessageController {
  findAll(req: Request, res: Response): void;
  create(req: Request, res: Response): void;
  remove(req: Request, res: Response): void;
}

export interface IAuthController {
  loginToken(req: Request, res: Response): void;
  refreshToken(req: Request, res: Response): void;
}

export interface IAvatarController {
  getAvatarByID(req: Request, res: Response): void;
}
