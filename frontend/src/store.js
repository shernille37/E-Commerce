import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productsSlice, productDetailsSlice } from './reducers/productReducers';
import { cartSlice } from './reducers/cartReducers';
import { userSlice } from './reducers/userReducers';
import { orderSlice } from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productsSlice,
  productDetails: productDetailsSlice,
  cart: cartSlice,
  user: userSlice,
  order: orderSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
