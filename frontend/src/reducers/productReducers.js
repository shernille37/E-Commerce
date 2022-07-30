import { createSlice } from '@reduxjs/toolkit';
import { listProducts, listProductDetails } from '../actions/productActions';

const productsInitialState = {
  products: [],
};

const productDetailsInitialState = {
  product: {
    reviews: [],
  },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: productsInitialState,
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
}).reducer;

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: productDetailsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listProductDetails.pending, (state, action) => {
        state.loading = true;
        state = productDetailsInitialState;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
}).reducer;
