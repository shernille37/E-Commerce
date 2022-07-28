import { configureStore } from '@reduxjs/toolkit';
import productReducers from './reducers/productReducers';

export default configureStore({
  reducer: {
    productList: productReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
