import { configureStore } from '@reduxjs/toolkit';
import { productsSlice, productDetailsSlice } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

export default configureStore({
  reducer: {
    productList: productsSlice,
    productDetails: productDetailsSlice,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
