import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
// auth part
const generateJwtTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password, bio } = req.body;
  if (
    [username, fullName, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "Essential fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser)
    throw new ApiError(409, "User with email or username already exists");

  const avatarLocalPath = await req?.files?.avatar[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0 &&
    req.files.coverImage[0].path.trim() //not undefined
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath, "image");

  const coverImage = await uploadOnCloudinary(coverImageLocalPath, "image");

  if (!avatar) {
    throw new ApiError(500, "Something went wrong while uploading avatar");
  }
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    bio,
    avatar: avatar.url,
    coverImage: coverImage?.url,
  });

  const createdUser = await User.findById(user?._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email)
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(404, "No user found");
  }
  const isPassValid = await user.isPasswordCorrect(password);
  if (!isPassValid) throw new ApiError(401, "Invalid password");

  const { accessToken, refreshToken } = await generateJwtTokens(user?._id);
  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  // console.log("Tokens", accessToken);
  // console.log("token", refreshToken);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return (
    res
      .status(200)
      // send in cookies
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      )
  );
});

export const logoutUser = asyncHandler(
  // clear refresh token
  asyncHandler(async (req, res) => {
    await User.findOneAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true, //https
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)

      .json(new ApiResponse(200, {}, "User logged Out"));
  })
);

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req?.user }, "user fetched successfully")
    );
});
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } = await generateJwtTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
export const changePassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPassValid = await user.isPasswordCorrect(oldPassword);
  if (!isPassValid) throw new ApiError(400, "Invalid Password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, username, bio } = req.body;
  if (!username || !fullName || !bio)
    throw new ApiError(400, "all fields are required");
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { fullName, username: username.toLowerCase(), bio },
    },
    { new: true }
  ).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User information updated successfully"));
});

export const updateAvatarPic = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path; // single file
  // console.log("avatar local file path", avatarLocalPath);
  if (!avatarLocalPath) throw new ApiError(400, "new avatar is required");

  const newAvatar = await uploadOnCloudinary(avatarLocalPath, "image");
  if (!newAvatar)
    throw new ApiError(500, "Something went wrong while uploading file");

  const deleteOldAvatar = await deleteFromCloudinary(req.user?.avatar, "image");
  // console.log("avatar deleting", deleteOldAvatar);

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: newAvatar.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User avatar updated successfully")
    );
});
export const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  // console.log("cover", coverImageLocalPath);

  if (!coverImageLocalPath)
    throw new ApiError(400, "new Cover image is required");

  const newCoverImage = await uploadOnCloudinary(coverImageLocalPath, "image");
  if (!newCoverImage)
    throw new ApiError(500, "Something went wrong while uploading cover image");

  if (req.user?.coverImage.trim()) {
    const response = await deleteFromCloudinary(req.user.coverImage, "image");
    //console.log("coverImage delete", response);
  }
  const updateUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: newCoverImage.url,
      },
    },
    { new: true }
  ).select("-refreshToken -password");

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "CoverImage updated successfully"));
});

// user fetching
export const fetchUserDetails = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username.trim()) throw new ApiError(404, "No user found");

  const userDetails = await User.aggregate([
    {
      $match: {
        username: username.trim().toLowerCase(),
      },
    },
    {
      // our followers
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "following",
        as: "followers",
      },
    },
    {
      // who we are following
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "follower",
        as: "following",
      },
    },
    {
      $addFields: {
        followersCount: {
          $size: "$followers",
        },
        followingCount: {
          $size: "$following",
        },
        isFollowing: {
          $cond: {
            if: { $in: [req.user?._id, "$followers.follower"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        email: 1,
        retweet: 1,
        username: 1,
        bio: 1,
        avatar: 1,
        coverImage: 1,
        createdAt: 1,
        followersCount: 1,
        followingCount: 1,
        isFollowing: 1,
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userDetails[0],
        "User information fetched successfully"
      )
    );
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const {
    page = 1, // pageNumber
    limit = 5, // no of tweet in single query
    query = "", // for search
    sortBy = "createdAt",
    sortType = 1, // assending
  } = req.query;

  const pipeline = [
    {
      $match: {
        // match the query
        $or: [
          {
            username: { $regex: query, $options: "i" },
          },
          {
            email: { $regex: query, $options: "i" },
          },
          {
            fullName: { $regex: query, $options: "i" },
          },
        ],
      },
    },
    {
      $project: {
        username: 1,
        email: 1,
        avatar: 1,
      },
    },
    {
      // sort assending by createdAt
      $sort: { [sortBy]: sortType },
    },
  ];
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const users = await User.aggregatePaginate(User.aggregate(pipeline), options);
  //console.log(users);

  if (!users)
    throw new ApiError(500, "Something went wrong while fetching users");

  return res
    .status(200)
    .json(new ApiResponse(200, users.docs, "users fetched successfully"));
});

// add retweets
export const addRetweets = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) throw new ApiError(404, "Invalid tweetId");

  const user = await User.findById(req.user?._id);

  if (!user) throw new ApiError(400, "Unauthorized request");

  const alreadyInRetweet = user.retweet.includes(tweetId);

  if (alreadyInRetweet)
    return res
      .status(200)
      .json(new ApiResponse(200, user.retweet, "Tweet already retweeted"));

  user.retweet.unshift(tweetId);
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(200, user.retweet, "Tweet added to retweet");
});

// user retweets
export const fetchUserRetweets = asyncHandler(async (req, res) => {
  const { username } = req.params || req.body;

  if (!username.trim()) throw new ApiError(404, "Invalid username");

  const userRetweets = await User.aggregate([
    {
      $match: {
        // match the username
        username: username.trim().toLowerCase(),
      },
    },
    {
      $lookup: {
        // look at tweet schema
        from: "tweets",
        localField: "retweet",
        foreignField: "_id",
        as: "userRetweets",
        pipeline: [
          {
            $lookup: {
              // look at user (owner of tweet)
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "ownersOfTweet",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                    email: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$ownersOfTweet", // get first element from user (owner tweet)
              },
            },
          },
          {
            $project: {
              owner: 1,
              content: 1,
              media: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        username: 1,
        userRetweets: 1,
      },
    },
  ]);
  //console.log("retweets", userRetweets[0]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userRetweets[0],
        "user retweets fetched successfully"
      )
    );
});
