import { v2 as cloudinary } from "cloudinary";
import uiModel from "../models/uiModel.js";

// Fetch UI Elements
export const getUIElements = async (req, res) => {
  try {
    const uiElements = await uiModel.find({});
    res.json({ success: true, uiElements });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Add UI Element
export const addUIElement = async (req, res) => {
  try {
    const { section, title, subCategory } = req.body;
    const file = req.file;

    if (!file) {
      return res.json({ success: false, message: "Media file is required" });
    }

    const upload = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });

    const uiElement = new uiModel({
      section,
      title,
      subCategory,
      mediaUrl: upload.secure_url,
      mediaPublicId: upload.public_id,
      resourceType: upload.resource_type,
    });

    await uiElement.save();

    res.json({ success: true, message: "Element Added", uiElement });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update UI Element
export const updateUIElement = async (req, res) => {
  try {
    const { id, section, title, subCategory } = req.body;
    const file = req.file;

    const element = await uiModel.findById(id);
    if (!element) return res.json({ success: false, message: "Element not found" });

    // Handle file changes
    if (file) {
      // Delete old from cloudinary
      if (element.mediaPublicId) {
        await cloudinary.uploader.destroy(element.mediaPublicId, {
          resource_type: element.resourceType,
        });
      }

      // Upload new file
      const upload = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });

      element.mediaUrl = upload.secure_url;
      element.mediaPublicId = upload.public_id;
      element.resourceType = upload.resource_type;
    }

    if (section) element.section = section;
    if (title) element.title = title;
    if (subCategory) element.subCategory = subCategory;

    await element.save();

    res.json({ success: true, message: "Element Updated", element });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete UI Element
export const deleteUIElement = async (req, res) => {
  try {
    const { id } = req.body;
    
    const element = await uiModel.findById(id);
    if (!element) return res.json({ success: false, message: "Element not found" });

    if (element.mediaPublicId) {
      await cloudinary.uploader.destroy(element.mediaPublicId, {
        resource_type: element.resourceType,
      });
    }

    await uiModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Element Deleted" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
