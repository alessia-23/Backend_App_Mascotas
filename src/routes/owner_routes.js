import { Router } from "express"
import { registro, confirmarMail, recuperarPassword, comprobarTokenPassword, crearNuevoPassword } from "../controllers/owner_controller.js"

const router = Router()

router.post("/owner/registro", registro)
router.post("/owner/confirm-mail/:token", confirmarMail)
router.post("/owner/reset-pasword", recuperarPassword)
router.get("/owner/reset-password/:token", comprobarTokenPassword)
router.post("/owner/new-password/:token", crearNuevoPassword)
export default router
