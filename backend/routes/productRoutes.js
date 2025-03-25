import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import _isValidObjectId from "../middleware/isValidObjectId.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, isAdmin, upload.single("image"), createProduct);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(_isValidObjectId, getProductById)
  .delete(protect, isAdmin, deleteProductById)
  .put(protect, isAdmin, updateProduct);

router
  .route("/:id/reviews")
  .post(protect, _isValidObjectId, createProductReview);

export default router;
