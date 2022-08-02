import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../actions/userActions';

const userInitialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const userReducer = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;

      localStorage.removeItem('user');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;

        // Set User to Local Storage
        localStorage.setItem('user', JSON.stringify(state.user));

        // TODO: Encrypt data in local storage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;

        // Set User to Local Storage
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userSlice = userReducer.reducer;
export const { logout } = userReducer.actions;
