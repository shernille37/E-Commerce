import { createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  getOrderDetails,
  payOrder,
  getMyOrders,
} from '../actions/orderActions';

const initialState = {
  order: null,
  loading: true,
  myOrders: [],
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetPay: (state, action) => {
      state.successPayment = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.successOrder = false;
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successOrder = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.successOrder = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(payOrder.pending, (state, action) => {
        state.successPayment = false;
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successPayment = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderSlice = orderReducer.reducer;

export const { resetPay } = orderReducer.actions;
