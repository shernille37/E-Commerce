import { createSlice } from '@reduxjs/toolkit';
import {
  getProfile,
  login,
  register,
  updateProfile,
  getAllUsers,
  deleteUser,
  logout,
} from '../actions/userActions';

const userInitialState = {
  authUser: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  userDetails: null,
  userList: [],
};

const userReducer = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetDeleteSuccess: (state, action) => {
      state.successDelete = false;
    },
    resetUpdateSuccess: (state, action) => {
      state.successUpdate = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout, (state, action) => {
        localStorage.removeItem('user');
        return userInitialState;
      })
      // --- LOGIN ---
      .addCase(login.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;

        // Set User to Local Storage
        localStorage.setItem('user', JSON.stringify(state.authUser));

        // TODO: Encrypt data in local storage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -- REGISTER --
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;

        // Set User to Local Storage
        localStorage.setItem('user', JSON.stringify(state.authUser));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -- GET PROFILE
      .addCase(getProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -- UPDATE PROFILE
      .addCase(updateProfile.pending, (state, action) => {
        state.loadingUpdate = true;
        state.successUpdate = false;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { name, email } = action.payload;

        state.loadingUpdate = false;
        state.successUpdate = true;
        state.userDetails = action.payload;
        // If the one updating is the logged in user then update the auth User
        if (state.authUser._id === action.payload._id)
          state.authUser = { ...state.authUser, name, email };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // -- GET ALL USERS EXCLUSIVELY FOR ADMINS
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state, action) => {
        state.error = null;
        state.loadingDelete = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.successDelete = true;
        state.loadingDelete = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const userSlice = userReducer.reducer;
export const { resetUpdateSuccess, resetDeleteSuccess } = userReducer.actions;
