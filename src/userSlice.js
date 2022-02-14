import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userAPI from "./userAPI";

const initialState = {
  // status: "idle",
  users: [],
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return await userAPI.fetchUsers();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // .addCase(fetchUsers.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // state.status = "idle";
        state.users = action.payload;
      });
  },
});

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
