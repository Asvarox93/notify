import { Router} from "express";
import messangesController from "../controllers/message.controller";


const router = Router()
const messages = messangesController

router.get('/', messages.findAll)
router.post('/create', messages.create)
router.delete('/delete', messages.remove)

export default router