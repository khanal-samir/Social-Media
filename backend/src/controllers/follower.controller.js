// toggleFollow getUserFollowers getUserFollowing
import { asyncHandler } from "../utils/asyncHandler.js";
import { Follower } from "../models/followers.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

export const toggleFollow = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId))
    throw new ApiError(400, "Invalid userId");

  // check if the logged in user is a follower
  const isFollowing = await Follower.findOne({
    follower: req.user?._id,
    following: userId,
  });
  // not followed so follow the user
  if (!isFollowing) {
    const followUser = await Follower.create({
      follower: req.user?._id,
      following: userId,
    });

    if (!followUser)
      throw new ApiError(500, "Something went wrong while following the user");

    return res
      .status(201)
      .json(new ApiResponse(200, followUser, "User followed successfully"));
  }
  // if following delete the document

  const deleteFollowing = await Follower.deleteOne({
    follower: req.user?._id,
    following: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User unfollowed successfully"));
});

export const getUserFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId))
    throw new ApiError(400, "Invalid userId");

  const followers = await Follower.find({
    following: userId,
  })
    .select("follower -_id")
    .populate("follower", "email username avatar");

  if (!followers.length)
    return res
      .status(200)
      .json(new ApiResponse(200, [], "User has no followers"));

  return res
    .status(200)
    .json(
      new ApiResponse(200, followers, "User followers fetched successfully")
    );
});

export const getUserFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId))
    throw new ApiError(400, "Invalid userId");

  const followers = await Follower.find({
    follower: userId,
  })
    .select("-_id following")
    .populate("following", "email username avatar");

  if (!followers.length)
    return res
      .status(200)
      .json(new ApiResponse(200, [], "User is not following to other users"));
  //console.log("foolwoing", followers);

  return res
    .status(200)
    .json(
      new ApiResponse(200, followers, "User following fetched successfully")
    );
});
