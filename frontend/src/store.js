import { configureStore } from '@reduxjs/toolkit';
import { productsSlice, productDetailsSlice } from './reducers/productReducers';
import { cartSlice } from './reducers/cartReducers';
import { userLoginSlice } from './reducers/userReducers';

export default configureStore({
  reducer: {
    productList: productsSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
    userLogin: userLoginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
