import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tweetId: {
      // tweet where comment is given
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
    owner: {
      // commenting user
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Comment = mongoose.model("Comment", commentSchema);
