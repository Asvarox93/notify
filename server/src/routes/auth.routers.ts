import { Router} from "express";
import authController from "../controllers/auth.controller";


const router = Router()
const auth = authController

router.post('/login', auth.loginToken)
router.post('/refresh', auth.refreshToken)


export default router