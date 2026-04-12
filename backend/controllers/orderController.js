import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razopay from 'razorpay'
import nodemailer from 'nodemailer'
import productModel from "../models/productModel.js";



// global varibles
const currency = 'inr'
const delivery_fee = 69


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



const sendOrderNotificationEmail = (orderId) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: 'Wildbears26@gmail.com',
            subject: `New Order Received - Order ID: ${orderId}`,
            html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #faf9f7;">
                    <h2 style="color: #111; margin-top: 0;">New Order Received!</h2>
                    <p>A customer has successfully placed a new order.</p>
                    <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
                        <p style="margin: 0;"><strong>Order Tracking ID:</strong> ${orderId}</p>
                    </div>
                    <p>Please click the link below to view and manage orders:</p>
                    <a href="https://wildbears-1u25.vercel.app/orders" style="display: inline-block; padding: 12px 24px; background-color: #111; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 5px;">View Orders Dashboard</a>
                </div>
            </body>
            </html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Failed to send admin notification email:", error);
            } else {
                console.log("Admin notification email sent: " + info.response);
            }
        });
    } catch (error) {
        console.error("Error setting up admin email:", error);
    }
};

// placing order using stripe
const placeOrderStripe = async (req, res) => {

}

// plcing order using razorpay
const placeOrderRazorpay = async (req, res) => {

    try {
        const {userId, items, amount, address} = req.body

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

    // Prepare mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: order.address.email, // Make sure email exists in order
      subject: `Order Status Updated - Order ID: ${order._id}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #faf9f7; color: #333333;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf9f7; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
                
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 40px 0; background-color: #111111;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 4px; font-weight: 800; text-transform: uppercase;">WILDBEARS</h1>
                    <p style="margin: 10px 0 0 0; color: #D8BF91; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Network Fulfillment Update</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td align="left" style="padding: 50px 40px;">
                    <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #111111;">Hello ${order.address.firstName},</h2>
                    <p style="margin: 0 0 30px 0; font-size: 15px; color: #666666; line-height: 1.6;">
                      Your order lifecycle has advanced. We are writing to inform you that your purchase logistics have been successfully updated in our system.
                    </p>
                    
                    <!-- Order Detail Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                      <tr>
                        <td width="30%" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888888; padding-bottom: 10px;">Order Tracker ID</td>
                        <td width="70%" style="font-family: monospace; font-size: 14px; color: #111111; padding-bottom: 10px; font-weight: bold;">${order._id}</td>
                      </tr>
                      <tr>
                        <td width="30%" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888888;">Live Status</td>
                        <td width="70%" style="font-size: 16px; color: #6B4E2E; font-weight: 900; letter-spacing: 0.5px;">${status}</td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.6; text-align: center;">
                      You can continue to track this trajectory natively via your client profile dashboard.<br><br>
                      Thank you for trusting <strong>WILDBEARS™</strong>.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 30px 40px; background-color: #faf9f7; border-top: 1px solid #eaeaea;">
                     <p style="margin: 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                      © ${new Date().getFullYear()} WILDBEARS INC. ALL RIGHTS RESERVED.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        toast.error("Failed")
        console.error("Failed to send email:", error)
      } else {
                toast.error("Success")

        console.log("Email sent: " + info.response)
      }
    })

    res.status(200).json({ success: true, message: "Order status updated and email sent" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export {verifyRazorpay, placeOrder, placeOrderStripe, placeOrderRazorpay, AllOrders, userOrder, updateStatus }

