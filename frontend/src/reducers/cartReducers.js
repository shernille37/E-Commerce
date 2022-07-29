import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../actions/cartActions';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        const item = action.payload;

        const itemIsExist = state.cartItems.find(
          (x) => x.product === item.product
        );

        if (itemIsExist) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === itemIsExist ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }

        // Save to Local Storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
}).reducer;
