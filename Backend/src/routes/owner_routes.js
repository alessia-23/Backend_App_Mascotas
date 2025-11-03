import { Router } from "express"
import { registro } from "../controllers/owner_controller.js"

const router = Router()

router.post("/owner/registro", registro)

export default router
