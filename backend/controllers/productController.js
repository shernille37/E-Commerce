import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Send all products to Client with JSON format
// @route GET /api/products
// @access PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const sort = req.query.sort;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  let products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (sort) {
    products.sort((a, b) =>
      sort === 'asc' ? a.price - b.price : b.price - a.price
    );
  }
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc Create a Product
// @route POST /api/products
// @access PRIVATE/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc Update a Product
// @route PUT /api/products/:id
// @access PRIVATE/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (image) product.image = image;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (countInStock) product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc Create new Review
// @route PUT /api/products/:id/reviews
// @access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc Delete product by ID
// @route DELETE /api/products/:id
// @access PRIVATE/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc GET top 3 rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({})
    .sort({ rating: -1 })
    .limit(3)
    .select('-reviews');

  if (topProducts) {
    res.json(topProducts);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  createProductReview,
  updateProduct,
  getTopProducts,
};
