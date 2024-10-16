import { Schema } from "mongoose";
import mongoose from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      //  two users
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      // there messages
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
export const Conversation = mongoose.model("Message", conversationSchema);
