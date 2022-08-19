import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listProducts = createAsyncThunk(
  'GET_LIST_PRODUCTS',
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/products');
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

export const listProductDetails = createAsyncThunk(
  'GET_PRODUCT_DETAILS',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
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

export const createProduct = createAsyncThunk(
  'CREATE_PRODUCT',
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

      const { data } = await axios.post(`/api/products`, {}, config);
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

export const updateProduct = createAsyncThunk(
  'UPDATE_PRODUCT',
  async (
    { id, name, price, category, image, countInStock, brand, description },
    { rejectWithValue }
  ) => {
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
        `/api/products/${id}`,
        { name, price, category, image, countInStock, brand, description },
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

export const createProductReview = createAsyncThunk(
  'CREATE_PRODUCT_REVIEW',
  async ({ id, rating, comment }, { rejectWithValue }) => {
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

      const { data } = await axios.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
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

export const deleteProduct = createAsyncThunk(
  'DELETE_PRODUCT',
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

      const { data } = await axios.delete(`/api/products/${id}`, config);
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
