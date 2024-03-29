import {
  chatJoinAttributes,
  chatMessageAttributes,
  ServerToClientEvents,
} from "../../types/sockets.types";
import { ModelStatic } from "sequelize/types";
import { ISocketController } from "../../types/controllers.types";
import { MessageModel } from "../../types/models.types";
import { Socket } from "socket.io/dist/socket";
import jwt from "jsonwebtoken";

export default class SocketController implements ISocketController {
  private messageModel: ModelStatic<MessageModel>;
  private socket: Socket<ServerToClientEvents>;

  constructor(
    messageModel: ModelStatic<MessageModel>,
    socket: Socket<ServerToClientEvents>
  ) {
    this.messageModel = messageModel;
    this.socket = socket;
  }
  getSocket = () => {
    return this.socket;
  };

  joinRoom = async (data: chatJoinAttributes) => {
    const { room, token }: chatJoinAttributes = data;
    if (!room || !token)
      return this.socket.emit("chat:demit", {
        status: "failure",
        message: "Room or Token not found!",
      });

    try {
      await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (_error: unknown) {
      return this.socket.emit("chat:demit", {
        status: "failure",
        message: "Unauthorized! Authentication required",
      });
    }

    this.socket.join(room);
    this.socket.emit("chat:success", { status: "success", room });
  };

  sendMessage = async (data: chatMessageAttributes) => {
    const { room, senderID, receiverID, message }: chatMessageAttributes = data;
    const errorMessage =
      "Message cannot be send to user. Please try again later!";
    const returnDeliveredToSender = () => {
      return this.socket.emit("chat:delivered", {
        status: "successfully",
        message,
      });
    };

    // If room is not a chat between users then send a message without save to db
    if (receiverID === undefined)
      return this.socket.to(room).emit(
        "chat:receive",
        {
          status: "successfully",
          message,
        },
        returnDeliveredToSender
      );
    if (!message)
      return this.socket.emit("chat:undelivered", {
        status: "failure",
        message: "Message cennot be empty!",
      });

    try {
      const response = await this.messageModel.create({
        senderID,
        receiverID,
        message,
      });
      if (!response) {
        this.socket.emit("chat:undelivered", {
          status: "failure",
          message: errorMessage,
        });
        return;
      }
      this.socket
        .to(room)
        .emit(
          "chat:receive",
          { status: "successfully", message },
          returnDeliveredToSender
        );
    } catch (_error: unknown) {
      this.socket.emit("chat:undelivered", {
        status: "failure",
        message: errorMessage,
      });
    }
  };
}
