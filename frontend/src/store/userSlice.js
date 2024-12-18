import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});
export const { setUsers, addUser } = userSlice.actions;
export default userSlice.reducer;
