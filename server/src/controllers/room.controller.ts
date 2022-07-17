import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Room from "../models/room.model";
import { setErrorMessage } from "./../util/util";

const fetchRoom = async (req: Request, res: Response) => {
  const { firstUserID, secondUserID } = req.body;
  if (!firstUserID || !secondUserID)
    return res
      .status(404)
      .send({
        status: 404,
        message: "Cannot find one or more users! Please try again later.",
      });

  const lowerId = firstUserID < secondUserID ? firstUserID : secondUserID;
  const upperId = firstUserID > secondUserID ? firstUserID : secondUserID;

  try {
    let room = await Room.findOne({
      where: { firstUserID: lowerId, secondUserID: upperId },
    });
    if (room === null) {
      room = await Room.create({
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

const roomController = { fetchRoom };
export default roomController;
