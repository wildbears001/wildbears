import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import walletTransactionModel from "../models/walletTransactionModel.js";



// ✅ Bulk update coins and free cash for all users
export const bulkUpdateUsers = async (req, res) => {
  try {
    const { coins = 0, wallet = 0, reason = "Admin Bulk Update" } = req.body;

    // Fetch all users
    const users = await userModel.find();

    // Update all users
    const updates = users.map(async (user) => {
      user.coins_balance = (user.coins_balance || 0) + Number(coins);
      user.wallet_balance = (user.wallet_balance || 0) + Number(wallet);
      await user.save();

      // Record transactions
      if (coins !== 0) {
        await walletTransactionModel.create({
          user_id: user._id,
          type: "HevenCoins",
          amount: coins,
          balance_after: user.coins_balance,
          reason,
          source: "Admin",
        });
      }
      if (wallet !== 0) {
        await walletTransactionModel.create({
          user_id: user._id,
          type: "HevenFreeCash",
          amount: wallet,
          balance_after: user.wallet_balance,
          reason,
          source: "Admin",
        });
      }
    });

    await Promise.all(updates);

    res.json({ message: "Bulk update successful", coins, wallet, usersUpdated: users.length });
  } catch (err) {
    console.error("❌ Bulk update error:", err.message);
    res.status(500).json({ message: "Bulk update failed", error: err.message });
  }
};
// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    // Map DB fields to frontend-friendly names
    const mappedUsers = users.map(user => ({
      ...user.toObject(),
      coins: user.coins_balance,
      walletBalance: user.wallet_balance
    }));

    res.json(mappedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single user details with orders
// export const getUserDetails = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await userModel.findById(userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const orders = await orderModel.find({ userId });

//     // Map DB fields to frontend-friendly names
//     const mappedUser = {
//       ...user.toObject(),
//       coins: user.coins_balance,
//       walletBalance: user.wallet_balance
//     };

//     res.json({ user: mappedUser, orders });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import mongoose from "mongoose";

// ✅ Get single user details with orders
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Make sure orders get fetched
    const orders = await orderModel.find({ userId: user._id });
    // const orders = await orderModel.find({ userId: mongoose.Types.ObjectId(user._id) });

    const mappedOrders = orders.map(order => ({
      _id: order._id,
      amount: order.amount,
      status: order.status,
      payment: order.payment, // true/false
      createdAt: new Date(order.date).toLocaleDateString(),
      items: order.items.map(item => item.name || item.title || "Unnamed Item") // adjust field according to your order items
    }));


    // Map DB fields to frontend-friendly names
    const mappedUser = {
      ...user.toObject(),
      coins: user.coins_balance,
      walletBalance: user.wallet_balance,
    };

    res.json({ user: mappedUser, orders: mappedOrders });
  } catch (error) {
    console.error("❌ Error in getUserDetails:", error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ Update user coins / wallet balance (credit or debit)
export const updateUserBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { coins_change = 0, wallet_change = 0, reason = "Admin Adjustment" } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Apply credit (+) or debit (-)
    user.coins_balance = (user.coins_balance || 0) + Number(coins_change);
    user.wallet_balance = (user.wallet_balance || 0) + Number(wallet_change);

    await user.save();

    // Record transaction for coins
    if (coins_change !== 0) {
      await walletTransactionModel.create({
        user_id: user._id,
        type: "HevenCoins",
        amount: coins_change, // can be +ve (credit) or -ve (debit)
        balance_after: user.coins_balance,
        reason,
        source: "Admin",
      });
    }

    // Record transaction for wallet balance
    if (wallet_change !== 0) {
      await walletTransactionModel.create({
        user_id: user._id,
        type: "HevenFreeCash",
        amount: wallet_change, // can be +ve (credit) or -ve (debit)
        balance_after: user.wallet_balance,
        reason,
        source: "Admin",
      });
    }

    // Return updated user with mapped fields
    const mappedUser = {
      ...user.toObject(),
      coins: user.coins_balance,
      walletBalance: user.wallet_balance,
    };

    res.json({ message: "User balance updated successfully", user: mappedUser });
  } catch (error) {
    console.error("❌ Error updating user balance:", error.message);
    res.status(500).json({ message: error.message });
  }
};


