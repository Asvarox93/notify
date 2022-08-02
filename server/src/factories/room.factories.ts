import { Sequelize } from "sequelize/types";
import { IRoomService } from "../../types/services.types";
import UserModel from "../models/user.model";
import RoomModel from "../models/room.model";
import RoomController from "../controllers/room.controller";
import RoomService from "../services/room.services";

const roomInstance = (db: Sequelize): IRoomService => {
  const userModel = UserModel(db);
  const roomModel = RoomModel(db, userModel);
  const roomController = new RoomController(roomModel);
  const roomService = new RoomService(roomController);

  return roomService;
};

export default roomInstance;
