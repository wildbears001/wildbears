import mongoose from "mongoose";

const uiSchema = new mongoose.Schema({
  section: { type: String, required: true }, // 'hero', 'video', 'category'
  title: { type: String }, // Default for category name
  subCategory: { type: String }, // For category
  mediaUrl: { type: String, required: true },
  mediaPublicId: { type: String, required: true },
  resourceType: { type: String, required: true, default: "image" } // 'image' or 'video'
});

const uiModel = mongoose.models.ui || mongoose.model("ui", uiSchema);

export default uiModel;
