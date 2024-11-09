import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getLikedUsers,
  getUserLikedTweet,
  toggleTweetLike,
} from "../controllers/like.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/:tweetId").post(toggleTweetLike).get(getLikedUsers);
router.route("/liked-tweets/:userId").get(getUserLikedTweet);
export default router;
