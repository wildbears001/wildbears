import express from 'express';
import {
  createCoupon,
  getAllCoupons,
  applyCoupon,
  disableCoupon
} from '../controllers/couponController.js';
import authUser from '../middleware/auth.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin routes
router.post('/create',  createCoupon);
router.get('/all',  getAllCoupons);
router.post('/disable',  disableCoupon);

// User route
router.post('/apply',authMiddleware ,  applyCoupon);

export default router;
