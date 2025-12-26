// backend/controllers/couponController.js
import Coupon from '../models/Coupon.js';
import Order from '../models/orderModel.js'; // needed to check per-user usage if required

// -------------------------
// CREATE NEW COUPON (ADMIN)
// -------------------------
export const createCoupon = async (req, res) => {
  try {
    const { code, discount_type, discount_value, min_order, expires_at, usage_limit } = req.body;

    if (!code || !discount_type || !discount_value || !min_order || !expires_at || !usage_limit) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ success: false, message: "Coupon code already exists" });

    const coupon = await Coupon.create({
      code,
      discount_type,
      discount_value,
      min_order,
      expires_at,
      usage_limit
    });

    res.status(201).json({ success: true, coupon, message: "Coupon created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// -------------------------
// GET ALL COUPONS (ADMIN)
// -------------------------
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------------
// APPLY COUPON (USER)
// -------------------------
export const applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const userId = req.userId;

    if (!code || orderAmount == null) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and order amount are required"
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      is_active: true
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found or inactive"
      });
    }

    if (new Date() > coupon.expires_at) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired"
      });
    }

    if (orderAmount < coupon.min_order) {
      return res.status(400).json({
        success: false,
        message: `Order must be at least ₹${coupon.min_order}`
      });
    }

    if (coupon.times_used >= coupon.usage_limit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached"
      });
    }

    const alreadyUsed = await Order.exists({
      userId,
      coupon: coupon.code
    });

    if (alreadyUsed) {
      return res.status(400).json({
        success: false,
        message: "You already used this coupon"
      });
    }

    const discount =
      coupon.discount_type === "percentage"
        ? Math.floor((orderAmount * coupon.discount_value) / 100)
        : coupon.discount_value;

    res.json({
      success: true,
      discount,
      code: coupon.code,
      message: "Coupon applied successfully"
    });

  } catch (error) {
    console.error("Coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
// -------------------------
// DISABLE COUPON (ADMIN)
// -------------------------
export const disableCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Coupon code required" });

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) return res.status(404).json({ success: false, message: "Coupon not found" });

    coupon.is_active = false;
    await coupon.save();

    res.json({ success: true, message: `Coupon ${coupon.code} disabled successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
