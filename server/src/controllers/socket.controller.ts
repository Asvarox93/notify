import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import {
  chatJoinAttributes,
  chatMessageAttributes,
  ServerToClientEvents,
} from "../../types/socket.types";
import Message from "../models/message.model";

const joinRoom = function (
  this: Socket<ServerToClientEvents>,
  data: chatJoinAttributes
) {
  const { room, token }: chatJoinAttributes = data;

  if (!room || !token)
    this.emit("chat:demit", {
      status: "failure",
      message: "Room or Token not found!",
    });

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (_error: unknown) {
    this.emit("chat:demit", {
      status: "failure",
      message: "Unauthorized! Authentication required",
    });
  }

  this.join(room);
};

const sendMessages = async function (
  this: Socket<ServerToClientEvents>,
  data: chatMessageAttributes
) {
  const { room, senderID, receiverID, message }: chatMessageAttributes = data;
  const errorMessage =
    "Message cannot be send to user. Please try again later!";

  // If room is not a chat between users then send a message without save to db
  if (receiverID === undefined)
    return this.to(room).emit("chat:receive", {
      status: "successfully",
      message,
    });
  if (!message)
    return this.emit("chat:receive", {
      status: "failure",
      message: "Message cennot be empty!",
    });

  try {
    const response = await Message.create({ senderID, receiverID, message });
    if (!response) {
      this.emit("chat:receive", { status: "failure", message: errorMessage });
      return;
    }

    this.to(room).emit("chat:receive", { status: "successfully", message });
  } catch (_error: unknown) {
    this.emit("chat:receive", { status: "failure", message: errorMessage });
  }
};

export const socketController = { joinRoom, sendMessages };
