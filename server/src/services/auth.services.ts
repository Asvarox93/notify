import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { setErrorMessage } from "../util/util";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res
      .status(401)
      .send({ status: 401, message: "Unable to authenticate" });

  jwt.verify(token, process.env.TOKEN_SECRET, (error: unknown) => {
    const message = setErrorMessage(error);
    if (error) return res.status(403).send({ status: 403, message: message });
    next();
  });
};

export default authenticate;
