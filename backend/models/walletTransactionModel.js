import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    type: { 
        type: String, 
        enum: ["HevenCoins", "HevenFreeCash"], 
        required: true 
    },

    amount: { type: Number, required: true },   // Positive (+) = Credit, Negative (-) = Debit
    balance_after: { type: Number, required: true }, // balance after this transaction

    reason: { type: String, default: "System Update" }, // e.g. Purchase Reward, Refund, Admin Adjustment
    source: { type: String, enum: ["System", "Admin", "Referral", "Promotion"], default: "System" },

    created_at: { type: Date, default: Date.now }
});

const walletTransactionModel = mongoose.models.walletTransaction 
    || mongoose.model("walletTransaction", walletTransactionSchema);

export default walletTransactionModel;
