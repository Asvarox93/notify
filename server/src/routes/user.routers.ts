import { Router } from "express";
import { IUserService } from "../../types/services.types";
import authenticate from "../configs/auth.config";
import { avatarImageUpload } from "../configs/file.config";

const routes = (userService: IUserService) => {
  const router = Router();

  router.get("/", authenticate, userService.findAll);
  router.get("/:ID", authenticate, userService.findById);
  router.post(
    "/create",
    avatarImageUpload.single("avatar"),
    userService.create
  );
  router.put("/update", authenticate, userService.update);
  router.delete("/delete", authenticate, userService.remove);

  return router;
};

export default routes;
