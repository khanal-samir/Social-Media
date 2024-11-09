import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getTweetComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();
router.use(verifyJWT);
router.route("/:tweetId").post(createComment).get(getTweetComments);
router.route("/:commentId").delete(deleteComment).patch(updateComment);
export default router;
