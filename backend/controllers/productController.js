import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Send all products to Client with JSON format
// @route GET /api/products
// @access PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Send a single product with ID to Client with JSON format
// @route GET /api/product/:id
// @access PUBLIC
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

export { getProducts, getProductById };
