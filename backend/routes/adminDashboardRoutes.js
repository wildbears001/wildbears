import express from "express";
import { getDashboardStats } from "../controllers/adminDashboardController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/stats",  getDashboardStats);

export default router;
