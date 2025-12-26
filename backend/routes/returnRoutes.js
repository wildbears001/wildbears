import express from "express";
import { requestReturn, updateReturnStatus, getAllReturns } from "../controllers/returnController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

// User requests return
router.post("/request", authUser, requestReturn);

// Admin updates return
router.put("/update", adminAuth, updateReturnStatus);

// Admin views all return requests
router.get("/all", adminAuth, getAllReturns);

export default router;
