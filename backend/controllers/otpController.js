import bcrypt from "bcrypt";
import Otp from "../models/otpModel.js";
import { sendOTPEmail } from "../services/emailService.js";

// ✅ Generate random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    // Rate limit: delete old OTPs first
    await Otp.deleteMany({ email });

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.create({ email, otpHash });

    await sendOTPEmail(email, otp);

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email });
    if (!record) return res.status(400).json({ success: false, message: "OTP not found or expired" });

    const isMatch = await bcrypt.compare(otp, record.otpHash);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid OTP" });

    // OTP verified → delete record
    await Otp.deleteMany({ email });

    // ✅ You can now update user status in DB
    // await User.updateOne({ email }, { $set: { isVerified: true } });

    res.json({ success: true, message: "OTP verified successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
