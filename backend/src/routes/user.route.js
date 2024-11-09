import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  updateAccountDetails,
  getCurrentUser,
  updateAvatarPic,
  updateCoverImage,
  fetchUserDetails,
  // addRetweets,
  // fetchUserRetweets,
  getAllUsers,
} from "../controllers/user.controller.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/all-users").get(verifyJWT, getAllUsers);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateAvatarPic);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateCoverImage);

router.route("/user-details/:username").get(verifyJWT, fetchUserDetails);
// TODO need to check after twitter controller
// router.route("/user-retweets/:username").get(verifyJWT, fetchUserRetweets);
// router.route("/add-retweets/:tweetId").post(verifyJWT, addRetweets);

export default router;
