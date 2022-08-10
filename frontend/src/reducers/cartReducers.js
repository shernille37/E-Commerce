import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../actions/cartActions';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null,
};

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );

      // Update LocalStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;

        const itemIsExist = state.cartItems.find(
          (x) => x.product === item.product
        );

        if (itemIsExist) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === itemIsExist.product ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }

        // Save to Local Storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const cartSlice = cartReducer.reducer;

export const { removeFromCart, saveShippingAddress } = cartReducer.actions;
