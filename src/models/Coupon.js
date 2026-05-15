const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        discountPercent: {
            type: Number,
            required: true,
        },
        maxUses: {
            type: Number,
            default: 10,
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        usedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        expiresAt: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Coupon", couponSchema);
