import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  getFollowingTweets,
  getSingleTweetById,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/all-tweets").get(getAllTweet);
router.route("/following-tweets").get(getFollowingTweets);
router.route("/add-tweet").post(upload.single("media"), createTweet);
router.route("/edit-tweet/:tweetId").patch(updateTweet);
router.route("/delete-tweet/:tweetId").post(deleteTweet);
router.route("/single-tweet/:tweetId").get(getSingleTweetById);
router.route("/user-tweet/:userId").get(getUserTweets);
export default router;
