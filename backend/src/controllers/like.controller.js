import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Like } from "../models/likes.model.js";
import { Tweet } from "../models/tweet.model.js";
import { createNotification } from "../utils/createNotification.js";

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

  const reciever = await Tweet.findById(tweetId);
  createNotification({
    recieverId: reciever.owner,
    tweetId,
    senderId: req.user._id,
    type: "like",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, like, "Tweet liked successfully"));
});

// info of user on who liked the tweets

export const getLikedUsers = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const likes = await Like.find({ tweetId }).populate(
    "likedBy",
    "avatar username"
  ); // showing only avatar
  if (likes.length === 0)
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No likes on the tweet"));
  return res
    .status(200)
    .json(new ApiResponse(200, likes, "Tweet likes fetched successfully"));
});

//TODO getUserLikedTweet-- add pipleline from tweet and owner
export const getUserLikedTweet = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const likedTweets = await Like.aggregate([
    {
      //first find all liked docs
      $match: {
        likedBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      //second lookups for tweets like and comments count ko lagi
      $lookup: {
        from: "tweets",
        localField: "tweetId",
        foreignField: "_id",
        as: "likedTweet",
        pipeline: [
          {
            $lookup: {
              //owner
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "tweetOwner",
              pipeline: [
                // pipeline lagayena ni add fields garnu pardena
                {
                  $project: {
                    username: 1,
                    email: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            //comment
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "tweetId",
              as: "tweetComments",
            },
          },
          {
            //likes
            $lookup: {
              from: "likes",
              localField: "_id",
              foreignField: "tweetId",
              as: "tweetLikes",
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$tweetOwner",
              },
              comments: {
                $size: "$tweetComments",
              },
              likes: {
                $size: "$tweetLikes",
              },
              isLiked: {
                // for like button color
                $cond: {
                  if: { $in: [req.user?._id, "$tweetLikes.likedBy"] },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $project: {
              // project this from tweet lookup
              content: 1,
              media: 1,
              owner: 1,
              comments: 1,
              likes: 1,
              isLiked: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
    {
      //third sort naya
      $sort: { ["createdAt"]: -1 },
    },
    {
      // tweet ko lookup ko doc
      $addFields: {
        tweet: { $first: "$likedTweet" },
      },
    },
    {
      // fifth project tweet matra
      $project: {
        tweet: 1,
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likedTweets,
        "Liked tweets of user fetched successfully"
      )
    );
});
