import { Router } from "express";
import roomController from "../controllers/room.controller";
import authenticate from "../services/auth.services";

const router = Router();
const room = roomController;

router.post("/", authenticate, room.fetchRoom);

export default router;
