import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme";
import authSlice from "./authSlice";
import tweetSlice from "./tweetSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    tweet: tweetSlice,
    user: userSlice,
  },
});
