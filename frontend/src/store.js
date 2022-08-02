import { configureStore } from '@reduxjs/toolkit';
import { productsSlice, productDetailsSlice } from './reducers/productReducers';
import { cartSlice } from './reducers/cartReducers';
import { userSlice } from './reducers/userReducers';

export default configureStore({
  reducer: {
    productList: productsSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
