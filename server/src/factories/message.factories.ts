import { Sequelize } from "sequelize/types";
import { IMessageService } from "../../types/services.types";
import UserModel from "../models/user.model";
import MessageModel from "../models/message.model";
import MessageController from "../controllers/message.controller";
import MessageService from "../services/message.services";

const messageInstance = (db: Sequelize): IMessageService => {
  const userModel = UserModel(db);
  const messageModel = MessageModel(db, userModel);
  const messageController = new MessageController(messageModel);
  const messageService = new MessageService(messageController);

  return messageService;
};

export default messageInstance;
