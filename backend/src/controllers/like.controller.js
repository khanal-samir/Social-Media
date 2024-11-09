import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Like } from "../models/likes.model.js";

export const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const likedTweet = await Like.findOne({
    tweetId: tweetId,
    likedBy: req.user?._id,
  });
  if (likedTweet) {
    await Like.findByIdAndDelete(likedTweet._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Tweet unliked successfully"));
  }
  const like = await Like.create({
    tweetId,
    likedBy: req.user?._id,
  });
  if (!like)
    throw new ApiError(500, "something went wrong while liking the tweet");
  return res
    .status(200)
    .json(new ApiResponse(200, like, "Tweet liked successfully"));
});

// info of user on how liked the tweets

export const getLikedUsers = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const likes = await Like.find({ tweetId }).populate("likedBy", "avatar"); // showing only avatar
  if (likes.length === 0)
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No likes on the tweet"));
  return res
    .status(200)
    .json(new ApiResponse(200, likes, "Tweet likes fetched successfully"));
});

//TODO getUserLikedTweet-- add pipleline from owner
const getUserLikedTweet = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const likedTweets = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "tweetId",
        foreignField: "_id",
        as: "likedTweets",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "tweetUsers",
            },
          },
          {
            $project: {
              email: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);
});
