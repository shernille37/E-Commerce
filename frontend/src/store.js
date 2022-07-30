import { configureStore } from '@reduxjs/toolkit';
import { productsSlice, productDetailsSlice } from './reducers/productReducers';
import { cartSlice } from './reducers/cartReducers';

export default configureStore({
  reducer: {
    productList: productsSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
