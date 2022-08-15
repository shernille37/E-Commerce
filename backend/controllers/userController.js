import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user and get token
// @route POST /api/users/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials!');
  }
});

// @desc Register a new user
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201); // Something was created
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc Get USER profile
// @route GET /api/users/profile
// @access PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc Update USER profile
// @route PUT /api/users/profile
// @access PRIVATE

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, password } = req.body;

    // If user sent an email and email is already in the Database
    if (email && email !== user.email) {
      if (await User.findOne({ email })) {
        res.status(400); // Bad Request
        throw new Error('Email already exists');
      } else {
        user.email = email;
      }
    }

    if (name) user.name = name;
    if (password) user.password = password;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc Get user by id
// @route GET /api/users/:id
// @access PRIVATE/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) res.json(user);
  else {
    res.status(404);
    throw new Error('User not Found');
  }
});

// @desc Get all USERS
// @route GET /api/users
// @access PRIVATE/Admin

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.json(users);
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access PRIVATE/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

// @desc Update USER
// @route PUT /api/users/:id
// @access PRIVATE/Admin

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const { name, email, isAdmin } = req.body;

    // If user sent an email and email is already in the Database
    if (email && email !== user.email) {
      if (await User.findOne({ email })) {
        res.status(400); // Bad Request
        throw new Error('Email already exists');
      } else {
        user.email = email;
      }
    }
    if (name) user.name = name;
    user.isAdmin = isAdmin;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
