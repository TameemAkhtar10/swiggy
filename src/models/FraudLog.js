const mongoose = require("mongoose");

const fraudLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null,
        },
        riskScore: {
            type: Number,
            default: 0,
        },
        reasons: [String],
        isFlagged: {
            type: Boolean,
            default: false,
        },
        reviewStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("FraudLog", fraudLogSchema);
