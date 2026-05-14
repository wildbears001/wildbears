import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razopay from 'razorpay'
import productModel from "../models/productModel.js";
import { sendAdminOrderNotification, sendOrderStatusUpdate } from "../services/emailService.js";



// global variables
const currency = 'inr'


//gateway initialize

const razorpayInstance = new razopay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})


// Placing Order using COD

import settingsModel from "../models/settingsModel.js";

const placeOrder = async (req, res) => {
    try {
        const settings = await settingsModel.findOne();
        if (!settings || !settings.isCodEnabled) {
            return res.json({ success: false, message: "Cash on Delivery is currently disabled by Admin." });
        }

        const { userId, items, amount, address } = req.body;

        // Server-side delivery fee validation
        const itemSubTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const threshold = settings.freeDeliveryThreshold || 0;
        const serverDeliveryFee = (threshold > 0 && itemSubTotal >= threshold) ? 0 : (settings.deliveryFee || 0);
        const codHandlingFee = 100;
        const expectedMin = itemSubTotal + serverDeliveryFee;

        if (amount < expectedMin - codHandlingFee - 1) {
            return res.json({ success: false, message: "Order amount mismatch. Please refresh and try again." });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        if (items) {
            for (const item of items) {
                await productModel.findByIdAndUpdate(item._id, { $inc: { stock: -item.quantity } });
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        sendOrderNotificationEmail(newOrder._id);

        res.json({ success: true, message: 'Order Placed successfully via COD!' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



const sendOrderNotificationEmail = async (orderId) => {
    try {
        await sendAdminOrderNotification(orderId);
    } catch (error) {
        console.error("Error sending admin order notification:", error);
    }
};

// placing order using stripe
const placeOrderStripe = async (req, res) => {

}

// plcing order using razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body

        // Server-side delivery fee validation
        const settings = await settingsModel.findOne();
        if (settings) {
            const itemSubTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const threshold = settings.freeDeliveryThreshold || 0;
            const serverDeliveryFee = (threshold > 0 && itemSubTotal >= threshold) ? 0 : (settings.deliveryFee || 0);
            const expectedMin = itemSubTotal + serverDeliveryFee - (settings.razorpayDiscount || 0);
            if (amount < expectedMin - 1) {
                return res.json({ success: false, message: "Order amount mismatch. Please refresh and try again." });
            }
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const verifyRazorpay = async (req,res)=>{
    try {
        const {userId,razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            const order = await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            
            if (order && order.items) {
                for (const item of order.items) {
                    await productModel.findByIdAndUpdate(item._id, { $inc: { stock: -item.quantity } });
                }
            }

            sendOrderNotificationEmail(order._id);

            res.json({success:true,message:"Payment Successful"})

        } else {
            res.json({success:false,message:"Payment Failed"})
        }


        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ALL ORDERS DATA FOR ADMIN PANEL
const AllOrders = async (req, res) => {

            try {
                const orders = await orderModel.find({})
                res.json({success:true,orders})
            } catch (error) {

                console.log(error);
                res.json({success:false,message:error.message})
                
            }



}
// USER ORDER DATA FOR FRONTEND
// const userOrder = async (req, res) => {
//     try {
//         const { userId } = req.body
//         const orders = await orderModel.find({userId}) 
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }

// }

const userOrder = async (req, res) => {
  try {
    const {userId} = req.body; // Adjust as per your auth logic
    const orders = await orderModel.find({ userId });

    const productMap = {};
    const products = await productModel.find();
    products.forEach(p => {
      productMap[p._id] = p;
    });

    const enrichedOrders = orders.map(order => {
      const enrichedItems = order.items.map(item => {
        const product = productMap[item._id] || {};
        return {
          ...item,
          image: product.image,
          name: product.name,
          price: product.price,
          isPreOrder: product.isPreOrder || false,
          preOrderAvailableDate: product.preOrderAvailableDate || null,
        };
      });
      return {
        ...order.toObject(),
        items: enrichedItems,
      };
    });

    res.json({ success: true, orders: enrichedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};
// Update Order Status from Admin panel
// const updateStatus = async (req, res) => {

//     try {
//         const {orderId, status} = req.body
//         await orderModel.findByIdAndUpdate(orderId,{status})
//         res.json({success:true,message:'Starus Updated'})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }

// }

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    const order = await orderModel.findByIdAndUpdate(orderId , {status})
    if (!order) return res.status(404).json({ success: false, message: "Order not found" })

    order.status = status
    await order.save()

    // Send Email
    try {
      if (order.address && order.address.email) {
         await sendOrderStatusUpdate(order.address.email, order._id, status, order.address.firstName || 'Customer');
         console.log("Status update email sent");
      }
    } catch (emailErr) {
       console.error("Failed to send status update email:", emailErr);
    }

    res.status(200).json({ success: true, message: "Order status updated and email sent" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export {verifyRazorpay, placeOrder, placeOrderStripe, placeOrderRazorpay, AllOrders, userOrder, updateStatus }

