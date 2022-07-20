import { IMessageController } from "../../types/controllers.types";
import { IMessageService } from "../../types/services.types";
import { Request, Response } from "express";

export default class MessageService implements IMessageService {
  private messageController: IMessageController;

  constructor(messageController: IMessageController) {
    this.messageController = messageController;
  }

  findAll = (req: Request, res: Response) => {
    return this.messageController.findAll(req, res);
  };

  create = (req: Request, res: Response) => {
    return this.messageController.create(req, res);
  };

  remove = (req: Request, res: Response) => {
    return this.messageController.remove(req, res);
  };
}
