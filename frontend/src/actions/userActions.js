import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  '/api/users/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const register = createAsyncThunk(
  '/api/users/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  '/api/users/getProfile',
  async (id, { rejectWithValue }) => {
    const { token } = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/users/${id ? id : 'profile'}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  '/api/users/updateProfile',
  async ({ name, email, password }, { rejectWithValue }) => {
    const { token } = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/profile`,
        { name, email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  '/api/users',
  async (id, { rejectWithValue }) => {
    const { token } = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/users`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  '/api/users/:id',
  async (id, { rejectWithValue }) => {
    const { token } = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`/api/users/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
