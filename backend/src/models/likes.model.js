import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
  tweetId: { type: Schema.Types.ObjectId, ref: "Tweet" },
  likedBy: { type: Schema.Types.ObjectId, ref: "User" },
});
export const Like = mongoose.model("Like", likeSchema);
