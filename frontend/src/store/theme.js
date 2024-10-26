import { createSlice } from "@reduxjs/toolkit";
//

const themeSlice = createSlice({
  name: "theme",
  initialState: "dark",
  reducers: {
    setTheme: (state, action) => action.payload || state,
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
