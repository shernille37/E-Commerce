import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/').get(protect, isAdmin, getAllUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect, isAdmin, deleteUser);

export default router;
