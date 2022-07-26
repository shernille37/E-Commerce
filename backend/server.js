import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

//Connect to Database
connectDB();

//Initialize Express
const app = express();

app.get('/', (req, res) => {
  res.send('API is Running');
});

// Product Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);
