import { createSlice } from '@reduxjs/toolkit';
import {
  getProfile,
  login,
  register,
  updateProfile,
} from '../actions/userActions';

const userInitialState = {
  authUser: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  userDetails: null,
  loading: true,
};

const userReducer = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logout: (state, action) => {
      state.authUser = null;
      state.userDetails = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers(builder) {
    builder
      // --- LOGIN ---
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
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
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
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
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userDetails = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -- UPDATE PROFILE
      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.userDetails = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userSlice = userReducer.reducer;
export const { logout } = userReducer.actions;
