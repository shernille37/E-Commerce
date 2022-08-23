import { createSlice } from '@reduxjs/toolkit';
import {
  listProducts,
  listProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../actions/productActions';

const productsInitialState = {
  products: [],
  topProducts: [],
  page: 1,
  pages: 1,
};

const productDetailsInitialState = {
  product: {
    reviews: [],
  },
};

export const productsReducer = createSlice({
  name: 'products',
  initialState: productsInitialState,
  reducers: {
    resetDeleteSuccess: (state, action) => {
      state.successDelete = false;
    },
  },
  extraReducers(builder) {
    builder

      // GET PRODUCTS
      .addCase(listProducts.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        listProducts.fulfilled,
        (state, { payload: { products, page, pages } }) => {
          state.loading = false;
          state.products = products;
          state.page = page;
          state.pages = pages;
        }
      )
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET TOP PRODUCTS

      .addCase(getTopProducts.pending, (state, action) => {
        state.loadingTopProducts = true;
        state.errorTopProducts = null;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.loadingTopProducts = false;
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.loadingTopProducts = false;
        state.errorTopProducts = action.payload;
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
    resetUpdateSuccess: (state, action) => {
      state.successUpdate = false;
    },
    resetReviewSuccess: (state, action) => {
      state.successReview = false;
    },
    resetErrorReview: (state, action) => {
      state.errorReview = null;
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

        // GET PRODUCT DETAILS
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
      })

      // CREATE PRODUCT REVIEWS
      .addCase(createProductReview.pending, (state, action) => {
        state.errorReview = null;
        state.loadingReview = true;
        state.successReview = false;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.errorReview = null;
        state.loadingReview = false;
        state.successReview = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.errorReview = action.payload;
        state.loadingReview = false;
        state.successReview = false;
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state, action) => {
        state.successUpdate = false;
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.successUpdate = true;
        state.loadingUpdate = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.successUpdate = false;
        state.loadingUpdate = false;
        state.error = action.payload;
      });
  },
});

export const productsSlice = productsReducer.reducer;
export const productDetailsSlice = productDetailsReducer.reducer;

export const { resetDeleteSuccess } = productsReducer.actions;

export const {
  resetCreateSuccess,
  resetUpdateSuccess,
  resetReviewSuccess,
  resetErrorReview,
} = productDetailsReducer.actions;
