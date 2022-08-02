import { Router } from "express";
import authenticate from "../configs/auth.config";
import { IAvatarController } from "./../../types/controllers.types";

const routes = (avatarController: IAvatarController) => {
  const router = Router();

  router.get("/:ID", authenticate, avatarController.getAvatarByID);

  return router;
};

export default routes;
