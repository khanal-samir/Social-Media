import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tweets: [],
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
  },
});

export const { allTweets, addTweet, rmTweet, updateTweet } = tweetSlice.actions;
export default tweetSlice.reducer;
