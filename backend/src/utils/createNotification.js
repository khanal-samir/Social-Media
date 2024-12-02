import { asyncHandler } from "./asyncHandler.js";
import { Notification } from "../models/notification.model.js";

export const createNotification = async ({
  senderId,
  recieverId,
  type,
  tweetId,
}) => {
  try {
    const notification = await Notification.create({
      senderId,
      recieverId,
      type,
      tweetId,
    });
  } catch (error) {
    console.log(error.message);
  }
};
