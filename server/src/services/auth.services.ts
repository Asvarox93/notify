import { IAuthService } from "../../types/services.types";
import { IAuthController } from "../../types/controllers.types";
import { Request, Response } from "express";
export default class AuthService implements IAuthService {
  private authController: IAuthController;
  constructor(authController: IAuthController) {
    this.authController = authController;
  }
  loginToken =(req: Request, res: Response)=> {
    console.log("BB",this);
    return this.authController.loginToken(req, res);
  }
  refreshToken=(req: Request, res: Response)=> {
    return this.authController.refreshToken(req, res);
  }
}
