import { Router } from "express";

export interface IRoutes {
  userRouter: Router;
  avatarRouter: Router;
  authRouter: Router;
  messageRouter: Router;
  roomRouter: Router;
}
