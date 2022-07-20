import { Router } from "express";
import { IMessageService } from "../../types/services.types";
import authenticate from "../configs/auth.config";

const routes = (messageService: IMessageService) => {
  const router = Router();

  router.get("/", authenticate, messageService.findAll);
  router.post("/create", authenticate, messageService.create);
  router.delete("/delete", authenticate, messageService.remove);

  return router;
};

export default routes;
