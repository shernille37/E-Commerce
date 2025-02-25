import { createSlice } from "@reduxjs/toolkit";

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

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

      // Calculate Prices
      state.itemsPrice = addDecimals(
        state.cart.cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        )
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

      // Set Local Storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );

      // Update LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
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
