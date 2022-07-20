import { Sequelize } from "sequelize/types";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket.types";
import { ISocketService } from "../../types/services.types";
import UserModel from "../models/user.model";
import MessageModel from "../models/message.model";
import SocketController from "../controllers/socket.controller";
import SocketService from "../services/socket.services";
import { Socket } from "socket.io/dist/socket";


const socketInstance = (
  db: Sequelize,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
):ISocketService => {
  const userModel = UserModel(db);
  const messageModel = MessageModel(db, userModel);
  const socketController = new SocketController(messageModel, socket);
  const socketService = new SocketService(socketController);
  
  return socketService;
};

export default socketInstance;
