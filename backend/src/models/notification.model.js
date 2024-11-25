import { Schema } from "mongoose";
import mongoose from "mongoose";

const notificationSchema = new Schema(
  {
    senderId: {
      // who sends message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      // who recieves message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tweetId: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);
export const Notification = mongoose.model("Notification", notificationSchema);
