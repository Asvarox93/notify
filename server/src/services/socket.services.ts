import { Socket } from "socket.io";
import { ISocketController } from "../../types/controllers.types";
import { ISocketService } from "../../types/services.types";
import {
  chatJoinAttributes,
  chatMessageAttributes,
  ServerToClientEvents,
} from "../../types/sockets.types";

export default class SocketService implements ISocketService {
  private socketController: ISocketController;

  constructor(socketController: ISocketController) {
    this.socketController = socketController;
  }
  getSocket(): Socket<ServerToClientEvents, ServerToClientEvents> {
    return this.socketController.getSocket();
  }

  joinRoom = (data: chatJoinAttributes) => {
    return this.socketController.joinRoom(data);
  };

  sendMessage = (data: chatMessageAttributes) => {
    return this.socketController.sendMessage(data);
  };
}
