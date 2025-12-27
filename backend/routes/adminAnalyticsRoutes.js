import express from "express";
import { getSalesAnalytics } from "../controllers/adminAnalyticsController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/sales",  getSalesAnalytics);

export default router;
