import mongoose, { Schema } from "mongoose";
const followerSchema = new Schema(
  {
    // for scability rather than creating array
    follower: {
      // who follows
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      // who is followed
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Follower = mongoose.model("Follower", followerSchema);
