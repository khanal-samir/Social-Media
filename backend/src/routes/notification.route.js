import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getNotification } from "../controllers/notification.controller.js";

const router = Router();

router.use(verifyJWT);
router.route("/").get(getNotification);
export default router;
