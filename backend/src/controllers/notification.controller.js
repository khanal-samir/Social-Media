import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";

export const getNotification = asyncHandler(async (req, res) => {
  // console.log(req.user._id);

  const notification = await Notification.find({
    recieverId: req.user?._id,
  })
    .populate("senderId", "email username avatar")
    .sort({ ["createdAt"]: -1 })
    .limit(10);
  // console.log(notification);

  if (!notification)
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No Notifications!"));

  return res
    .status(200)
    .json(
      new ApiResponse(200, notification, "Notification fetched successfully")
    );
});
