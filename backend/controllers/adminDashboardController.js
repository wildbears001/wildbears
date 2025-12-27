import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ payment: true });
    const pendingOrders = await Order.countDocuments({ payment: false });
    const preOrders = await Order.countDocuments({ "items.isPreOrder": true });

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { payment: true } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);

    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        paidOrders,
        pendingOrders,
        preOrders,
        totalUsers,
        totalProducts
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
