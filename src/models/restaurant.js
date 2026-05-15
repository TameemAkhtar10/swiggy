const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    cuisine: {
      type: String,
    },
    priceRange: {
      type: Number,
      min: 1,
      max: 4,
    },
    estimatedDeliveryTime: {
      type: Number,
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
restaurantSchema.index({ name: "text", cuisine: "text" });
module.exports = mongoose.model("Restaurant", restaurantSchema);
