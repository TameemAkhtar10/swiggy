const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },
        favoriteCuisines: {
            type: [String],
            default: [],
        },
        orderCount: {
            type: Number,
            default: 0,
        },
        lastOrderedAt: {
            type: Date,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("UserPreference", userPreferenceSchema);
