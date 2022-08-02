import { Request, Response } from "express";
import { ModelStatic } from "sequelize/types";
import { IAvatarController } from "../../types/controllers.types";
import { AvatarModel } from "../../types/models.types";
import { resolveFilePath, setErrorMessage } from "../util/util";

class AvatarController implements IAvatarController {
  private avatarModel: ModelStatic<AvatarModel>;
  constructor(avatarModel: ModelStatic<AvatarModel>) {
    this.avatarModel = avatarModel;
  }

  getAvatarByID = async (req: Request, res: Response) => {
    if (!req.params.ID)
      return res
        .status(404)
        .send({ status: 404, message: "Avatar ID not found" });

    try {
      const avatar = await this.avatarModel.findByPk(req.params.ID);

      console.log("avatar", avatar);
      console.log("avatarGet", avatar?.get());

      if (!avatar)
        return res
          .status(404)
          .send({ status: 404, message: "Avatar not found" });

      const file = resolveFilePath("assets/avatars/", avatar.get().filename);
      console.log("file", file);
      return res.status(200).type(avatar.get().mimetype).sendFile(file);
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };
}

export default AvatarController;
