import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUserFollowers,
  getUserFollowing,
  toggleFollow,
} from "../controllers/follower.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/:userId").post(toggleFollow);
router.route("/followers/:userId").get(getUserFollowers);
router.route("/following/:userId").get(getUserFollowing);

export default router;
