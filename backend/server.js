import express from 'express'
import cors from 'cors'
import 'dotenv/config' ;
import connnectDb from './config/mogodb.js'
import connectClouinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv'
import  reviewConnection  from './config/reviewDb.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminUserRoute from "./routes/adminUserRoute.js";
import couponRoutes from './routes/couponRoutes.js';
import returnRoutes from "./routes/returnRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";



// APP CONFIG

dotenv.config()


const app = express()
const port = process.env.PORT || 4000
connnectDb()
connectClouinary()


// MiddleWares

app.use(express.json())
app.use(cors())

// API endPoints

app.use('/api/user',userRouter)
app.use("/api/admin/users", adminUserRoute);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// app.use('/api/reviews', reviewRoutes);
app.use('/api', reviewRoutes);


app.use('/api/coupons', couponRoutes);

app.use("/api/returns", returnRoutes);

app.use("/api/otp", otpRoutes);



//DASHBOARD ROUTES
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);


app.get('/',(req,res)=>{
        res.send("API WORKING")
})

app.listen(port,()=>console.log('server sarted on PORT :'+port))


