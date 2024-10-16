import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
      // who made the tweet
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      type: String, //cloudinary
      enum: ["video", "image"],
    },
  },
  { timestamps: true }
);
export const Tweet = mongoose.model("Tweet", tweetSchema);
