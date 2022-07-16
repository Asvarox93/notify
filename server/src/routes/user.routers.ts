import UserController from "../controllers/user.controller";
import { Router} from "express";
import authenticate from "../services/auth.services";

const router = Router()
const users = UserController

router.get('/',authenticate, users.findAll)
router.post('/create', users.create)
router.put('/update', authenticate, users.update)
router.delete('/delete',authenticate, users.remove)

export default router