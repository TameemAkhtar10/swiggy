const mongoose = require("mongoose");

const deliveryPartnerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        currentOrders: {
            type: Number,
            default: 0,
        },
        location: {
            lat: Number,
            lng: Number,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
