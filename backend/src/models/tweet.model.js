import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
      default: "",
    },
  },
  { timestamps: true }
);
tweetSchema.plugin(mongooseAggregatePaginate);
export const Tweet = mongoose.model("Tweet", tweetSchema);
