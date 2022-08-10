import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    res.status(201).json(
      await Order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentInfo: {
          paymentMethod,
        },
        priceInfo: {
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
      })
    );
  }
});

export { addOrderItems };
