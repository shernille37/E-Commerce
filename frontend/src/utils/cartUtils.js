export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  state.cart.itemsPrice = addDecimals(
    state.cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  state.cart.shippingPrice = addDecimals(state.cart.itemsPrice > 100 ? 0 : 100);

  state.cart.taxPrice = addDecimals(
    Number((0.15 * state.cart.itemsPrice).toFixed(2))
  );
  state.cart.totalPrice = addDecimals(
    Number(state.cart.itemsPrice) +
      Number(state.cart.shippingPrice) +
      Number(state.cart.taxPrice)
  );

  // Set Local Storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
