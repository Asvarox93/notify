import { IUserController } from "../../types/controllers.types";
import { Request, Response } from "express";

export default class UserService implements IUserController {
  private userController: IUserController;

  constructor(userController: IUserController) {
    this.userController = userController;
  }

  create(req: Request, res: Response) {
    return this.userController.create(req, res);
  }

  findAll(req: Request, res: Response) {
    return this.userController.findAll(req, res);
  }

  update(req: Request, res: Response) {
    return this.userController.update(req, res);
  }
  remove(req: Request, res: Response) {
    return this.userController.remove(req, res);
  }
}
