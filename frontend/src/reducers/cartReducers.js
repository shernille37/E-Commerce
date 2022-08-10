import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../actions/cartActions';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null,
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : null,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
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

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },

    calculatePrices: (state, action) => {
      const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);

      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );
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

export const {
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  calculatePrices,
} = cartReducer.actions;
