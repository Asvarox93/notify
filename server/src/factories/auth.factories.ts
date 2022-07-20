import { IAuthService } from './../../types/services.types';
import { Sequelize } from "sequelize/types";
import UserModel from "../models/user.model";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.services";

const authInstance = (db: Sequelize): IAuthService => {
  const userModel = UserModel(db);
  const authController = new AuthController(userModel);
  const authService = new AuthService(authController);
  return authService;
};

export default authInstance;
