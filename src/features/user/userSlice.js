import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userAPI from "./userAPI";

const initialState = {
  panelState: {
    mode: "loading",
  },
  users: [],
};

// fetch users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return await userAPI.fetchUsers();
});

// add user
export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, { rejectWithValue }) => {
    try {
      return await userAPI.addUser(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// edit user
export const editUser = createAsyncThunk(
  "user/editUser",
  async (user, { rejectWithValue }) => {
    try {
      return await userAPI.editUser(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (user) => {
  return await userAPI.deleteUser(user);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    beginAddUser: (state) => {
      state.panelState = {
        mode: "add",
        user: {
          name: "",
          username: "",
          email: "",
          address: {
            city: "",
          },
        },
        errors: {},
      };
    },
    beginEditUser: (state, action) => {
      state.panelState = {
        mode: "edit",
        user: action.payload,
        errors: {},
      };
    },
    cancelUserAction: (state) => {
      state.panelState = {
        mode: "view",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.panelState = {
          mode: "view",
        };
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.panelState = {
          mode: "view",
        };
      })
      .addCase(addUser.rejected, (state, action) => {
        state.panelState.errors = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (userIndex >= 0) {
          state.users[userIndex] = action.payload;
          state.panelState = {
            mode: "view",
          };
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.panelState.errors = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (userIndex >= 0) {
          state.users.splice(userIndex, 1);
        }
      });
  },
});

export const { beginAddUser, beginEditUser, cancelUserAction } =
  userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const selectPanelState = (state) => state.user.panelState;

export default userSlice.reducer;
