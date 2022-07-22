import { UserModel, UserWithPass } from "../../types/models.types";
import { IUserController } from "../../types/controllers.types";
import { ModelStatic } from "sequelize/types";
import { Request, Response } from "express";

import { userFieldsValidation } from "../util/validation.util";
import { encryptPassword, setErrorMessage } from "../util/util";


export default class UserController implements IUserController {
  private userModel: ModelStatic<UserModel>;

  constructor(userModel: ModelStatic<UserModel>) {
    this.userModel = userModel;
  }

  findAll = async (_req: Request, res: Response) => {
    const response = await this.userModel.findAll();
    res.status(200).send({ users: response });
  };

  create = async (req: Request, res: Response) => {
    if (!userFieldsValidation(req.body)) {
      res.status(400).send({
        status: 400,
        error:
          "Fields validation faild! User cannot be createed. Please try again later!",
      });
      return;
    }

    const { firstName, lastName, nickname, password }: UserWithPass = req.body;
    const hashPassword = await encryptPassword(password);

    const user: UserWithPass = {
      firstName,
      lastName,
      nickname,
      password: hashPassword,
    };

    try {
      const response = await this.userModel.create(user);
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
