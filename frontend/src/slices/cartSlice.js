import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = {
  cart: localStorage.getItem("cart")
    ? { ...JSON.parse(localStorage.getItem("cart")).cart }
    : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" },

  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const { cartItems } = state.cart;

      const existingItem = cartItems.find((i) => i._id === item._id);

      if (existingItem)
        state.cart.cartItems = cartItems.map((i) =>
          i._id === existingItem._id ? item : i
        );
      else state.cart.cartItems = [...cartItems, item];

      // Update Cart
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (x) => x._id !== action.payload
      );

      // Update LocalStorage
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.cart.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },

    resetCartItems: (state, action) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  resetCartItems,
} = cartSlice.actions;
