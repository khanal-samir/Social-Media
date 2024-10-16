import mongoose, { Schema } from "mongoose";
const storySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      type: String,
      enum: ["video", "image"],
      required: true,
    },
    viewedby: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    expiresAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours later
      },
      required: true,
    },
  },
  { timestamps: true }
);
// TTL Index to expire stories after 24 hours
storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const Story = mongoose.model("Story", storySchema);
