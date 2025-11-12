import { getAvatar, listAvatars, listAvatarStyles, serveAvatar } from "../client/avatar/getAvatar.js"
import { Router } from "express"

const router = Router()

router.post("/avatar/save", getAvatar)
router.get("/avatar/get-all", listAvatars)
router.get("/avatar/styles", listAvatarStyles);
router.get("/avatar/:filename", serveAvatar);

export default router
