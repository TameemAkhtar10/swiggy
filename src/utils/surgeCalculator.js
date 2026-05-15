const SurgeSetting = require("../models/SurgeSetting");

async function getDeliveryCharge() {
    const setting = await SurgeSetting.findOne({ isActive: true }).sort({ updatedAt: -1 });
    const currentHour = new Date().getHours();

    const baseDeliveryFee = setting?.baseDeliveryFee ?? 30;
    const priceBoost = setting?.surgeMultiplier ?? 1;
    const peakHours = setting?.peakHours || [];

    const isSurge = peakHours.some((range) => {
        if (range.start <= range.end) {
            return currentHour >= range.start && currentHour <= range.end;
        }
        return currentHour >= range.start || currentHour <= range.end;
    });

    const deliveryFee = isSurge
        ? baseDeliveryFee * priceBoost
        : baseDeliveryFee;

    return { deliveryFee, isSurge, surgeMultiplier: priceBoost };
}

module.exports = getDeliveryCharge;
