import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCheckoutSession } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);

export default router;
