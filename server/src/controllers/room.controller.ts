import { ModelStatic } from "sequelize/types";
import { RoomModel } from "../../types/models.types";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { setErrorMessage } from "./../util/util";
import { IRoomController } from "../../types/controllers.types";

export default class RoomController implements IRoomController {
  private roomModel: ModelStatic<RoomModel>;

  constructor(roomModel: ModelStatic<RoomModel>) {
    this.roomModel = roomModel;
  }

  fetchRoom = async (req: Request, res: Response) => {
    const { firstUserID, secondUserID } = req.body;
    if (!firstUserID || !secondUserID)
      return res.status(404).send({
        status: 404,
        message: "Cannot find one or more users! Please try again later.",
      });

    const lowerId = firstUserID < secondUserID ? firstUserID : secondUserID;
    const upperId = firstUserID > secondUserID ? firstUserID : secondUserID;

    try {
      let room = await this.roomModel.findOne({
        where: { firstUserID: lowerId, secondUserID: upperId },
      });
      if (room === null) {
        room = await this.roomModel.create({
          firstUserID: lowerId,
          secondUserID: upperId,
          roomUid: uuidv4(),
        });
      }
      return res.status(200).send({ status: 200, message: room });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      return res.status(500).send({ status: 500, error: message });
    }
  };
}
