import asyncHandler from "../middleware/asyncHandler.js";
import Stripe from "stripe";
import Order from "../models/orderModel.js";

// @desc    Create Checkout session
// @route   POST /checkout/create-checkout-session
// @access  Private
const createCheckoutSession = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { _id: orderId, orderItems, shippingPrice } = req.body;

  const taxRate = await stripe.taxRates.create({
    display_name: "TAX",
    percentage: 15,
    inclusive: false,
  });

  const line_items = orderItems.map((orderItem) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: orderItem.name,
      },
      unit_amount: Math.round(orderItem.price * 100),
    },
    quantity: orderItem.qty,
    tax_rates: [taxRate.id],
  }));

  const shipping_options = [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: "Standard Rate",
        fixed_amount: {
          currency: "usd",
          amount: shippingPrice * 100,
        },
      },
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    shipping_options,
    metadata: {
      orderId,
    },
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/order/${orderId}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/order/${orderId}`,
  });

  res.json({ id: session.id });
});

export { createCheckoutSession };
