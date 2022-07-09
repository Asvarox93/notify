import UserController from "../controllers/User";
import { Router} from "express";

const router = Router()
const users = UserController

router.get('/', users.findAll)
router.post('/create', users.create)

export default router