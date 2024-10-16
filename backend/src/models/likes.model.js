import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
  tweetId: { type: Schema.Types.ObjectId, ref: "Tweet" },
  commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
  LikedBy: { type: Schema.Types.ObjectId, ref: "User" },
});
export const Like = mongoose.model("Like", likeSchema);
