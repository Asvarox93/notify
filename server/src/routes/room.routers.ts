import { Router } from "express";
import { IRoomService } from "../../types/services.types";
import authenticate from "../configs/auth.config";

const routes = (roomService: IRoomService) => {
  const router = Router();

  router.post("/", authenticate, roomService.fetchRoom);

  return router;
};

export default routes;
