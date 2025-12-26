import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

import {placeOrder,placeOrderStripe,placeOrderRazorpay,AllOrders,userOrder,updateStatus, verifyRazorpay} from '../controllers/orderController.js'

const orderRouter = express.Router()

// Admin Routes
orderRouter.post('/list',adminAuth,AllOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)  
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Feature

orderRouter.post('/userorders',authUser,userOrder)


//verify payment
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay) 


export default orderRouter

