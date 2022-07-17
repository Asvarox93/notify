import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Login, UserAttributes } from "./../../types/model.types";
import User from "../models/user.model";
import { setErrorMessage } from "../util/util";

const loginToken = async (req: Request, res: Response) => {
  const { username, password }: Login = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ status: 404, message: "Invalid email or password" });
  }

  const user = await User.findOne({ where: { nickname: username } });
  if (!user)
    return res
      .status(404)
      .send({ status: 404, message: "Invalid email or password" });

  const validPassword = await bcrypt.compare(password, user.get().password);
  if (!validPassword)
    return res
      .status(404)
      .send({ status: 404, message: "Invalid email or password" });

  const { ID, firstName, lastName, nickname } = user.get();
  const validUser: UserAttributes = { ID, firstName, lastName, nickname };

  const accessToken = jwt.sign(validUser, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });
  const refreshToken = jwt.sign(validUser, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 525600,
  });
  user.update({ refToken: refreshToken });

  res.status(200).send({ accessToken, refreshToken });
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (!refreshToken)
    return res.status(401).send({ status: 401, message: "Token not provided" });

  const { ID } = jwt_decode(refreshToken) as UserAttributes;
  if (ID === undefined)
    return res.status(401).send({ status: 401, message: "Token is not valid" });

  const user = await User.findOne({ where: { ID } });
  if (user === null)
    return res.status(401).send({ status: 401, message: "Token is not valid" });

  if (user.get("refToken") !== refreshToken)
    return res.status(401).send({ status: 401, message: "Token is not valid" });

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error: unknown) {
    const message = setErrorMessage(error);
    return res.status(403).send({ status: 403, error: message });
  }

  const { firstName, lastName, nickname } = user.get();
  const validUser = { ID, firstName, lastName, nickname };

  const accessToken = jwt.sign(validUser, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.status(200).send({ accessToken });
};

const authController = { loginToken, refreshToken };
export default authController;
