import { Sequelize } from "sequelize/types";
import { IAvatarService } from "../../types/services.types";
import AvatarModel from "../models/avatar.model";
import UserModel from "../models/user.model";
import AvatarController from "../controllers/avatar.controller";
import AvatarService from "../services/avatar.services";

const avatarInstance = (db: Sequelize): IAvatarService => {
  const userModel = UserModel(db);
  const avatarModel = AvatarModel(db, userModel);
  const avatarController = new AvatarController(avatarModel);
  const avatarService = new AvatarService(avatarController);
  return avatarService;
};

export default avatarInstance;
