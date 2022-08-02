import { IRoomController } from "../../types/controllers.types";
import { IRoomService } from "../../types/services.types";
import { Request, Response } from "express";

export default class RoomService implements IRoomService {
  private roomController: IRoomController;
  constructor(roomController: IRoomController) {
    this.roomController = roomController;
  }

  fetchRoom = (req: Request, res: Response) => {
    return this.roomController.fetchRoom(req, res);
  };
}
