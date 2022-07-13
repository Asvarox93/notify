import { Router} from "express";
import messangesController from "../controllers/message.controller";
import authenticate from "../services/auth.services";


const router = Router()
const messages = messangesController

router.get('/',authenticate, messages.findAll)
router.post('/create', authenticate, messages.create)
router.delete('/delete', authenticate, messages.remove)

export default router