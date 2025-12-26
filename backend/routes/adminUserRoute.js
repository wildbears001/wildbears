import express from "express";
import { getAllUsers, getUserDetails, updateUserBalance } from "../controllers/adminUserController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import { bulkUpdateUsers } from "../controllers/adminUserController.js";


const router = express.Router();

router.get("/",getAllUsers);
router.get("/:userId",  getUserDetails);
router.put("/:userId",  updateUserBalance);
router.post("/bulk-update",  bulkUpdateUsers);


export default router;
