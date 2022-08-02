import { AvatarAttributes } from "./../../types/models.types";
import { AvatarModel, UserModel, UserWithPass } from "../../types/models.types";
import { IUserController } from "../../types/controllers.types";
import { ModelStatic, Sequelize } from "sequelize/types";
import { Request, Response } from "express";
import { userFieldsValidation } from "../util/validation.util";
import { encryptPassword, setErrorMessage } from "../util/util";

export default class UserController implements IUserController {
  private db: Sequelize;
  private userModel: ModelStatic<UserModel>;
  private avatarModel: ModelStatic<AvatarModel>;

  constructor(
    db: Sequelize,
    userModel: ModelStatic<UserModel>,
    avatarModel: ModelStatic<AvatarModel>
  ) {
    this.db = db;
    this.userModel = userModel;
    this.avatarModel = avatarModel;
  }

  findById = async (req: Request, res: Response) => {
    if (!userFieldsValidation(req.params as typeof req.body, true)) {
      res.status(400).send({
        status: 400,
        error:
          "Fields validation faild! User cannot be createed. Please try again later!",
      });
      return;
    }

    const { ID } = req.params;

    try {
      const user = await this.userModel.findByPk(ID);
      const avatar = await this.avatarModel.findByPk(ID);

      if (!user || !avatar)
        return res.status(404).send({
          status: 404,
          error: "Ups! User cannot be find. Please try again later!",
        });

      res.status(201).send({ status: 201, response: { user, avatar } });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    const users = await this.userModel.findAll();
    const avatars = await this.avatarModel.findAll();
    res.status(200).send({ users, avatars });
  };

  create = async (req: Request, res: Response) => {
    if (!userFieldsValidation(req.body) || !req.file) {
      res.status(400).send({
        status: 400,
        error:
          "Fields validation faild! User cannot be createed. Please try again later!",
      });
      return;
    }

    const { firstName, lastName, nickname, password }: UserWithPass = req.body;
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    const hashPassword = await encryptPassword(password);

    const user: UserWithPass = {
      firstName,
      lastName,
      nickname,
      password: hashPassword,
    };

    try {
      const response = await this.db.transaction(async (transaction) => {
        const validUser = await this.userModel.create(user, { transaction });
        const userID = validUser.get().ID;

        if (!userID) throw new Error("No user ID was found!");

        const avatar: AvatarAttributes = {
          userID,
          filename,
          filepath,
          mimetype,
          size,
        };

        const validAvatar = await this.avatarModel.create(avatar, {
          transaction,
        });

        return { User: validUser, Avatar: validAvatar };
      });

      if (!response) {
        res.status(400).send({
          status: 400,
          error: "Ups! User cannot be created. Please try again later!",
          response: response,
        });
        return;
      }
      res.status(201).send({ status: 201, response: response });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };

  update = async (req: Request, res: Response) => {
    if (!userFieldsValidation(req.body, true)) {
      res.status(400).send({
        status: 400,
        error: "Not valid data provided. Please try again later!",
      });
      return;
    }

    const { ID, firstName, lastName, nickname, password }: UserWithPass =
      req.body;
    const user: UserWithPass = {
      firstName,
      lastName,
      nickname,
      password,
    };
    //TODO: Add possibility to change a avatar
    //TODO: Check token and password before update
    try {
      const response = await this.userModel.update(user, { where: { ID: ID } });

      if (!response[0]) {
        res.status(401).send({
          status: 401,
          error:
            "Ups! User proporities cannot be updated. Please try again later!",
        });
        return;
      }

      res.status(200).send({ status: 200, response: response });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };

  remove = async (req: Request, res: Response) => {
    const { ID } = req.body;

    if (ID == null) {
      res.status(400).send({
        status: 400,
        error: "No ID provided. Please try again later!",
      });
      return;
    }

    //TODO: Check token and password before remove

    try {
      const response = await this.userModel.destroy({ where: { ID: ID } });

      if (!response) {
        res.status(400).send({
          status: 400,
          error: "Ups! User cannot be deleted. Please try again later!",
        });
        return;
      }

      res.status(200).send({ status: 200, response: response });
    } catch (error: unknown) {
      const message = setErrorMessage(error);
      res.status(501).send({ status: 501, error: message });
    }
  };
}
