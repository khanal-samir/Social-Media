// create update delete getSingleTweetById getAllTweet(aggPage) getUserTweets  TODO add followingtweets controller
// might need to aggregate comment and likes also while getting tweets
import { Tweet } from "../models/tweet.model.js";
import { Follower } from "../models/followers.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content.trim()) throw new ApiError(400, "Content is required");

  const mediaPath = req.file?.path;

  if (mediaPath) {
    if (
      !req.file.mimetype.startsWith("video") &&
      !req.file.mimetype.startsWith("image")
    )
      throw new ApiError(400, "Please only include image or videos"); // only upload image or video

    const fileType = req.file.mimetype.startsWith("video") ? "video" : "image"; // check MIME type video/mp4 image/png image/jpeg
    const media = await uploadOnCloudinary(mediaPath, fileType);
    if (!media)
      throw new ApiError(500, "Something went wrong while uploading the media");

    const tweet = await Tweet.create({
      content,
      media: media.url,
      owner: req.user?._id,
    });

    if (!tweet)
      throw new ApiError(500, "Something went wrong while creating tweet");

    const newTweet = await Tweet.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(tweet._id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                _id: 1,
                username: 1,
                avatar: 1,
                email: 1,
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
          pipeline: [
            {
              $project: {
                likedBy: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          owner: {
            $first: "$owner", // $first: is used to get the first element of Owner array
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
          media: 1,
          createdAt: 1,
          content: 1,
          owner: 1,
          comments: 1,
          likes: 1,
          isLiked: 1,
          tweetLikes: 1,
        },
      },
      {
        $sort: { ["createdAt"]: -1 },
      },
    ]);
    if (!newTweet)
      // maybe return res no tweets
      throw new ApiError(500, "Something went wrong while getting users tweet");

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newTweet[0],
          "tweet with media created successfully"
        )
      );
  }
  const tweet = await Tweet.create({
    content,
    owner: req.user?._id,
  });
  if (!tweet)
    throw new ApiError(500, "Something went wrong while creating tweet");

  const newTweet = await Tweet.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweet._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              avatar: 1,
              email: 1,
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
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner", // $first: is used to get the first element of Owner array
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
        media: 1,
        createdAt: 1,
        content: 1,
        owner: 1,
        comments: 1,
        likes: 1,
        isLiked: 1,
        tweetLikes: 1,
      },
    },
    {
      $sort: { ["createdAt"]: -1 },
    },
  ]);
  if (!newTweet)
    // maybe return res no tweets
    throw new ApiError(500, "Something went wrong while getting users tweet");

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newTweet[0],
        "tweet without media created successfully"
      )
    );
});

export const updateTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  if (!content.trim()) throw new ApiError(400, "New content is required");

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) throw new ApiError(404, "Tweet not found");

  if (!new mongoose.Types.ObjectId(req.user?._id).equals(tweet.owner))
    throw new ApiError(401, "Unauthorized request");

  tweet.content = content;
  await tweet.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

export const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!mongoose.isValidObjectId(tweetId))
    throw new ApiError(400, "Invalid tweetId");

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new ApiError(404, "Tweet not found");

  if (tweet.media.trim()) {
    const mediaArr = tweet.media.split("/");
    const isImage = mediaArr.includes("image");
    const fileType = isImage ? "image" : "video";
    await deleteFromCloudinary(tweet.media, fileType);
  }
  const response = await Tweet.deleteOne({
    _id: new mongoose.Types.ObjectId(tweetId),
    owner: req.user._id,
  });

  if (!response)
    throw new ApiError(500, "Something went wrong while deleting tweet");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Tweet deleted Successfully"));
});

//TODO add like and comment count pipeline
export const getSingleTweetById = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!mongoose.isValidObjectId(tweetId))
    throw new ApiError(400, "Invalid tweetId");

  const tweet = await Tweet.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweetId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              avatar: 1,
              email: 1,
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
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner", // $first: is used to get the first element of Owner array
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
        media: 1,
        createdAt: 1,
        content: 1,
        owner: 1,
        comments: 1,
        likes: 1,
        isLiked: 1,
        tweetLikes: 1,
      },
    },
    {
      $sort: { ["createdAt"]: -1 },
    },
  ]);
  if (!tweet)
    // maybe return res no tweets
    throw new ApiError(500, "Something went wrong while getting users tweet");

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet by Id fetched successfully"));
});

export const getAllTweet = asyncHandler(async (req, res) => {
  // aggregation and pagination
  const {
    page = 1, // pageNumber
    limit = 20, // no of tweet in single query
    query = "", // for search
    sortBy = "createdAt",
    sortType = -1, // descending
  } = req.query;

  const pipeline = [
    {
      $match: {
        $or: [
          {
            content: { $regex: query, $options: "i" },
          },
          {
            owner: { $regex: query, $options: "i" },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              email: 1,
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
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner", // $first: is used to get the first element of Owner array
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
        media: 1,
        createdAt: 1,
        content: 1,
        owner: 1,
        comments: 1,
        likes: 1,
        isLiked: 1,
        tweetLikes: 1,
      },
    },
    {
      $sort: { [sortBy]: sortType },
    },
  ];
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const tweets = await Tweet.aggregatePaginate(
    Tweet.aggregate(pipeline),
    options
  );
  if (!tweets)
    throw new ApiError(500, "Something went wrong while fetching all Tweets");

  return res
    .status(200)
    .json(new ApiResponse(200, tweets.docs, "Tweets fetched successfully"));
});

export const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params || req.body;

  if (!mongoose.isValidObjectId(userId))
    throw new ApiError(400, "Invalid userId");

  const tweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              avatar: 1,
              email: 1,
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
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner", // $first: is used to get the first element of Owner array
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
        media: 1,
        createdAt: 1,
        content: 1,
        owner: 1,
        comments: 1,
        likes: 1,
        isLiked: 1,
        tweetLikes: 1,
      },
    },
    {
      $sort: { ["createdAt"]: -1 },
    },
  ]);
  if (!tweets)
    // maybe return res no tweets
    throw new ApiError(500, "Something went wrong while getting users tweets");

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "User data fetched successfully"));
});

export const getFollowingTweets = asyncHandler(async (req, res) => {
  const {
    page = 1, // pageNumber
    limit = 20, // no of tweet in single query
    sortBy = "createdAt",
    sortType = -1, // new post
    // if username
  } = req.query;

  const followingDocuments = await Follower.find({
    follower: req.user?._id,
  });

  const followingTweetsArr = followingDocuments.map((doc) => doc.following);

  if (followingTweetsArr.length === 0)
    throw new ApiError(404, "No followers found");

  const tweets = await Tweet.aggregatePaginate(
    Tweet.aggregate([
      { $match: { owner: { $in: followingTweetsArr } } }, // check id from following array
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
          pipeline: [
            {
              $project: {
                _id: 1,
                username: 1,
                avatar: 1,
                email: 1,
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
          pipeline: [
            {
              $project: {
                likedBy: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          owner: {
            $first: "$ownerDetails",
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
          media: 1,
          createdAt: 1,
          content: 1,
          comments: 1,
          likes: 1,
          isLiked: 1,
          owner: 1,
          tweetLikes: 1,
        },
      },
      {
        $sort: { [sortBy]: sortType },
      },
    ]),
    {
      page: parseInt(page),
      limit: parseInt(limit),
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, tweets.docs, "Following tweets fetched"));
});
