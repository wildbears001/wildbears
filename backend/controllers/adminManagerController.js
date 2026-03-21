import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

export const addAdmin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const exists = await adminModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "Admin already exists!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({ email, password: hashedPassword, role });
        await newAdmin.save();

        res.json({ success: true, message: "Admin account created successfully!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const listAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find({}, "-password");
        res.json({ success: true, admins });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        await adminModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Admin removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
