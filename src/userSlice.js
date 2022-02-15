import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userAPI from "./userAPI";

const initialState = {
  // status: "idle",
  users: [],
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return await userAPI.fetchUsers();
});

// add user
let nextUserId = 11;
export const addUser = createAsyncThunk("user/addUser", async (user) => {
  return {
    id: nextUserId++,
    ...user,
  };
});

// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (user) => {
  return user;
})
// edit user
export const editUser = createAsyncThunk("user/editUser", async (user) => {
  return user;
})

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
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (userIndex >= 0) {
          state.users.splice(userIndex, 1);
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (userIndex >= 0) {
          state.users[userIndex] = action.payload;
        }
      })
  },
});

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
