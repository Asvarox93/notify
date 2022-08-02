import { IAuthService } from "./../../types/services.types";
import { Router } from "express";

const routers = (authService: IAuthService) => {
  const router = Router();
  router.post("/login", authService.loginToken);
  router.post("/refresh", authService.refreshToken);

  return router;
};

export default routers;
