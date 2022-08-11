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

// @desc Get order by Id
// @route GET /api/orders/:id
// @access PRIVATE

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access PRIVATE

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
