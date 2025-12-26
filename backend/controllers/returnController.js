import orderModel from "../models/orderModel.js";

// ✅ User requests a return
export const requestReturn = async (req, res) => {
  try {
    const { orderId, reason, upiId } = req.body;  // include upiId from frontend
    // const userId = req.user.id; // from auth middleware
        const userId = req.body.userId; // ✅ read from body, as per your auth middleware


    const order = await orderModel.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only allow return if order is delivered
    if (order.status !== "Delivered") {
      return res.status(400).json({ message: "You can only request a return after delivery" });
    }

    // Prevent duplicate request
    if (order.returnRequest?.isRequested) {
      return res.status(400).json({ message: "Return already requested for this order" });
    }

    order.returnRequest = {
      isRequested: true,
      reason,
      upiId, // store UPI ID for refund
      status: "pending",
      requestedAt: new Date()
    };

    await order.save();
    res.json({ message: "Return request submitted successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin updates return request
export const updateReturnStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!order.returnRequest?.isRequested) {
      return res.status(400).json({ message: "No return request found for this order" });
    }

    order.returnRequest.status = status;
    await order.save();

    res.json({ message: `Return ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin gets all returns
export const getAllReturns = async (req, res) => {
  try {
    const returns = await orderModel.find({ "returnRequest.isRequested": true })
      .populate("userId", "name email"); // show user details

    res.json(returns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
