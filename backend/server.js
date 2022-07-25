import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();

//Connect to Database
connectDB();

//Initialize Express
const app = express();

app.get('/', (req, res) => {
  res.send('API is Running');
});

// Send all products to Client with JSON format
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Send single product to Client with JSON format
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
