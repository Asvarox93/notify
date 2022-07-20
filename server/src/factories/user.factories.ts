import { IUserService } from './../../types/services.types';
import { Sequelize } from "sequelize/types";
import UserModel from "../models/user.model";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.services";

const userInstance = (db: Sequelize): IUserService => {
  const userModel = UserModel(db);
  const userController = new UserController(userModel);
  const userService = new UserService(userController);

  return userService;
};

export default userInstance;
