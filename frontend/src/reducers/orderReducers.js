import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/userActions';
import {
  createOrder,
  getOrderDetails,
  payOrder,
  getMyOrders,
} from '../actions/orderActions';

const initialState = {
  order: null,
  myOrders: [],
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetSuccessOrder: (state, action) => {
      state.successOrder = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout, () => initialState)
      // CREATE ORDER
      .addCase(createOrder.pending, (state, action) => {
        state.successOrder = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successOrder = true;
        state.order = action.payload;

        // Clear cart
        localStorage.removeItem('cartItems');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.successOrder = false;
        state.loading = false;
        state.error = action.payload;
      })

      // GET ORDER DETAILS
      .addCase(getOrderDetails.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PAY ORDER
      .addCase(payOrder.pending, (state, action) => {
        state.error = null;
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

      // GET MY ORDERS
      .addCase(getMyOrders.pending, (state, action) => {
        state.error = null;
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

export const { resetSuccessOrder } = orderReducer.actions;
