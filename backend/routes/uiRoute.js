import express from "express";
import { getUIElements, addUIElement, updateUIElement, deleteUIElement } from "../controllers/uiController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const uiRouter = express.Router();

uiRouter.get("/list", getUIElements);

// Add UI Element (single file upload expected with field name 'media')
uiRouter.post("/add", adminAuth, upload.single("media"), addUIElement);

// Update UI Element (optional file upload)
uiRouter.post("/update", adminAuth, upload.single("media"), updateUIElement);

uiRouter.post("/delete", adminAuth, deleteUIElement);

export default uiRouter;
