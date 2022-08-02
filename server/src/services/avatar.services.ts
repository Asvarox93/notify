import { IAvatarController } from "./../../types/controllers.types";
import { IAvatarService } from "../../types/services.types";
import { Request, Response } from "express";

export default class AvatarService implements IAvatarService {
  private avatarController: IAvatarController;

  constructor(avatarController: IAvatarController) {
    this.avatarController = avatarController;
  }

  getAvatarByID = (req: Request, res: Response) => {
    return this.avatarController.getAvatarByID(req, res);
  };
}
