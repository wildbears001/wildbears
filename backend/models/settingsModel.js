import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    isCodEnabled: { type: Boolean, default: false },
    socialLinks: {
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
        youtube: { type: String, default: "" }
    },
    contactInfo: {
        phone: { type: String, default: "+91 62818 74010" },
        email: { type: String, default: "heven.storess@gmail.com" }
    }
});

const settingsModel = mongoose.models.settings || mongoose.model("settings", settingsSchema);
export default settingsModel;
