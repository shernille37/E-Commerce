import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { listProducts } from '../actions/productActions';

const initialState = {
  products: [],
  loading: null,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { productRequest, productSuccess, productFail } =
  productsSlice.actions;

export default productsSlice.reducer;
