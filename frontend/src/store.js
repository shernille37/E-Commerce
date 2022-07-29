import { configureStore } from '@reduxjs/toolkit';
import { productsSlice, productDetailsSlice } from './reducers/productReducers';

export default configureStore({
  reducer: {
    productList: productsSlice,
    productDetails: productDetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
