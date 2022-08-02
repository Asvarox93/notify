import { IUserService } from "./../../types/services.types";
import { Sequelize } from "sequelize/types";
import UserModel from "../models/user.model";
import AvatarModel from "../models/avatar.model";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.services";

const userInstance = (db: Sequelize): IUserService => {
  const userModel = UserModel(db);
  const avatarModel = AvatarModel(db, userModel);
  const userController = new UserController(db, userModel, avatarModel);
  const userService = new UserService(userController);

  return userService;
};

export default userInstance;
