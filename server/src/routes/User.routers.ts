import UserController from "../controllers/user.controller";
import { Router} from "express";

const router = Router()
const users = UserController

router.get('/', users.findAll)
router.post('/create', users.create)
router.put('/update', users.update)
router.delete('/delete', users.remove)

export default router