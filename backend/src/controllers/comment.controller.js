// create readAllComment update delete
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";
import { createNotification } from "../utils/createNotification.js";
export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  if (!content.trim()) throw new ApiError(400, "Content is required");

  const comment = await Comment.create({
    content,
    tweetId,
    owner: req.user?._id,
  });

  if (!comment)
    throw new ApiError(500, "Something went wrong while creating comment");
  const reciever = await Tweet.findById(tweetId);
  createNotification({
    recieverId: reciever.owner,
    tweetId,
    senderId: req.user._id,
    type: "comment",
  });
  return res
    .status(201)
    .json(
      new ApiResponse(201, comment, "Comment created created successfully")
    );
});

export const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params;

  if (!content.trim()) throw new ApiError(400, "New content is required");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (!new mongoose.Types.ObjectId(req.user?._id).equals(comment.owner))
    throw new ApiError(401, "Unauthorized request");

  comment.content = content;
  await comment.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const response = await Comment.deleteOne({
    owner: req.user?._id,
    _id: new mongoose.Types.ObjectId(commentId),
  });
  //console.log(response);
  if (!response)
    throw new ApiError(500, "Something went wrong while deleting comment");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});

// might need to aggregate
export const getTweetComments = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const tweetComments = await Comment.find({ tweetId: tweetId }).populate(
    "owner",
    "email avatar username"
  );
  if (tweetComments.length === 0)
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No comments in the tweet"));
  return res
    .status(200)
    .json(
      new ApiResponse(200, tweetComments, "Tweet comments fetched successfully")
    );
});
