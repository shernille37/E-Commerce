import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      const { _id: decodedId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedId).select('-password');

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed!');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token!');
  }
});
