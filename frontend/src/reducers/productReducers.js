import { createSlice } from '@reduxjs/toolkit';
import {
  listProducts,
  listProductDetails,
  createProduct,
  deleteProduct,
} from '../actions/productActions';
import { logout } from '../actions/userActions';

const productsInitialState = {
  products: [],
  loading: false,
};

const productDetailsInitialState = {
  product: {
    reviews: [],
  },
  loading: false,
};

export const productsReducer = createSlice({
  name: 'products',
  initialState: productsInitialState,
  reducers: {
    resetDeleteSuccess: (state, action) => {
      state.successDelete = false;
    },
    resetUpdateSuccess: (state, action) => {
      state.successUpdate = false;
    },
  },
  extraReducers(builder) {
    builder

      // GET PRODUCTS
      .addCase(listProducts.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state, action) => {
        state.error = null;
        state.loadingDelete = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.successDelete = true;
        state.loadingDelete = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.successDelete = false;
        state.loadingDelete = false;
        state.error = action.payload;
      });
  },
});

export const productDetailsReducer = createSlice({
  name: 'productDetails',
  initialState: productDetailsInitialState,
  reducers: {
    resetCreateSuccess: (state, action) => {
      state.successCreate = false;
    },
  },
  extraReducers(builder) {
    builder
      // CREATE PRODUCT
      .addCase(createProduct.pending, (state, action) => {
        state.successCreate = false;
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.successCreate = true;
        state.loadingCreate = false;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.successCreate = false;
        state.loadingCreate = false;
        state.error = action.payload;
      })
      .addCase(listProductDetails.pending, (state, action) => {
        state.error = null;
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
});

export const productsSlice = productsReducer.reducer;
export const productDetailsSlice = productDetailsReducer.reducer;

export const { resetDeleteSuccess, resetUpdateSuccess } =
  productsReducer.actions;

export const { resetCreateSuccess } = productDetailsReducer.actions;
