import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tweets: [],
  singleTweet: {},
  likes: [],
  comment: [],
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    allTweets: (state, action) => {
      state.tweets = action.payload;
    },
    addTweet: (state, action) => {
      state.tweets.unshift(action.payload);
    },
    rmTweet: (state, action) => {
      state.tweets = state.tweets.filter(
        (tweet) => tweet._id !== action.payload._id,
      );
    },
    updateTweet: (state, action) => {
      state.tweets = state.tweets.map((tweet) =>
        tweet._id === action.payload._id
          ? { ...tweet, content: action.payload.content }
          : tweet,
      );
    },
    setLikedUsers: (state, action) => {
      state.likes = action.payload;
    },
    removeLikedUsers: (state) => {
      state.likes = [];
    },

    allComments: (state, action) => {
      state.comment = action.payload;
    },
    addComments: (state, action) => {
      state.comment.unshift(action.payload);
    },
    rmComments: (state, action) => {
      state.comment = state.comment.filter(
        (comment) => comment._id !== action.payload._id,
      );
    },
    updateComments: (state, action) => {
      state.comment = state.comment.map((comment) =>
        comment._id === action.payload._id
          ? { ...comment, content: action.payload.content }
          : comment,
      );
    },
  },
});

export const {
  allTweets,
  addTweet,
  rmTweet,
  updateTweet,
  setLikedUsers,
  removeLikedUsers,
  allComments,
  addComments,
  rmComments,
  updateComments,
} = tweetSlice.actions;
export default tweetSlice.reducer;
