import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

//Connect to Database
connectDB();

//Initialize Express
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is Running');
});

// Product Routes
app.use('/api/products', productRoutes);

// User Routes
app.use('/api/users', userRoutes);

//--Middlewares--

// Not Found Error
app.use(notFound);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);
