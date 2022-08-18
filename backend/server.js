import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

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

// Order Routes
app.use('/api/orders', orderRoutes);

// UPLOAD ROUTE
app.use('/api/upload', uploadRoutes);

// PAYPAL
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
