import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/userActions';

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const userLoginReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        // Set User to Local Storage
        localStorage.setItem('user', JSON.stringify(state.user));

        // TODO: Encrypt data in local storage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userLoginSlice = userLoginReducer.reducer;
export const { logout } = userLoginReducer.actions;
