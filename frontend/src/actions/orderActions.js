import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'api/orders',
  async (order, { rejectWithValue }) => {
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

      const { data } = await axios.post(`/api/orders`, order, config);

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

export const getOrderDetails = createAsyncThunk(
  '/api/orders/:id',
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

      const { data } = await axios.get(`/api/orders/${id}`, config);

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

export const payOrder = createAsyncThunk(
  '/api/orders/:id/pay',
  async ({ orderId, paymentResult }, { rejectWithValue }) => {
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
        `/api/orders/${orderId}/pay`,
        paymentResult,
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
