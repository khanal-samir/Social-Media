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
      enum: ["following", "retweet", "like", "comment"],
      required: true,
    },
    tweetId: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);
export const Notification = mongoose.model("Notification", notificationSchema);
