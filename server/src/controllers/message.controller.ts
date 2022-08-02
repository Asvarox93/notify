import { MessageAttributes, MessageModel } from "../../types/models.types";
import { ModelStatic } from "sequelize/types";
import { IMessageService } from "../../types/services.types";
import { messageFieldsValidation } from "../util/validation.util";
import { Request, Response } from "express";
import { setErrorMessage } from "../util/util";

export default class MessageController implements IMessageService {
  private messageModel: ModelStatic<MessageModel>;

  constructor(messageModel: ModelStatic<MessageModel>) {
    this.messageModel = messageModel;
  }

  findAll = async (_req: Request, res: Response) => {
    const messages = await this.messageModel.findAll();
    res.status(201).send(messages);
  };

  create = async (req: Request, res: Response) => {
    if (!messageFieldsValidation(req.body)) {
      return res.status(400).send({
        status: 400,
        error:
          "Fields validation faild! Messange cannot be createed. Please try again later!",
      });
    }

    const { senderID, receiverID, message }: MessageAttributes = req.body;
    const messToCreate = {
      senderID,
      receiverID,
      message,
    };

    try {
      const response = await this.messageModel.create(messToCreate);
      if (!response) {
        return res.status(401).send({
          status: 401,
          error: "Ups! Messange cannot be created. Please try again later!",
          response: response,
        });
      }
      res.status(201).send({ status: 201, response: response });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };

  //TODO: Think of Update function - necessary?

  remove = async (req: Request, res: Response) => {
    const { ID } = req.body;

    if (ID == null) {
      res.status(400).send({
        status: 400,
        error: "No ID provided. Please try again later!",
      });
      return;
    }

    //TODO: check if user ID is equel with logged one
    try {
      const response = await this.messageModel.destroy({ where: { ID: ID } });

      if (!response) {
        res.status(401).send({
          status: 401,
          error: "Ups! Message cannot be deleted. Please try again later!",
        });
        return;
      }

      res.status(201).send({ status: 201, response: response });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };
}
