const express = require('express');
const products = require('./data/products');

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

app.listen(5000, console.log('Server Running on port 5000'));
