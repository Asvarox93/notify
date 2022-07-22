import { Router } from "express";

export interface IRoutes {
  userRouter: Router;
  authRouter: Router;
  messageRouter: Router;
  roomRouter: Router;
}