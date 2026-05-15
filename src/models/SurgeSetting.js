const mongoose = require("mongoose");

const surgeSettingSchema = new mongoose.Schema(
  {
    peakHours: [
      {
        start: Number,
        end: Number,
      },
    ],
    surgeMultiplier: {
      type: Number,
      default: 1.5,
    },
    baseDeliveryFee: {
      type: Number,
      default: 30,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SurgeSetting", surgeSettingSchema);