import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getLikedUsers,
  toggleTweetLike,
} from "../controllers/like.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/:tweetId").post(toggleTweetLike).get(getLikedUsers);
export default router;
