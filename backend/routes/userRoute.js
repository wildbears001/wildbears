import express from 'express';
import { loginUser,registerUser,adminLogin , getUserProfile , updateProfile , getTransactions , getProfileStats} from '../controllers/userController.js';
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ make sure you have middleware to decode token
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfileImage } from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.put("/profile/update", authMiddleware, updateProfile);
userRouter.get("/transactions", authMiddleware, getTransactions);
userRouter.get(
  "/profile/stats",
  authMiddleware,
  getProfileStats
);

userRouter.post(
  "/profile/upload",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage
);




export default userRouter;
