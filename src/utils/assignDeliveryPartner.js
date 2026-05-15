const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/order");

async function findNearestRider(orderId, restaurantLocation) {
    const partners = await DeliveryPartner.find({
        isAvailable: true,
        currentOrders: { $lt: 3 },
    });

    if (!partners.length) {
        return null;
    }

    const lat2 = Number(restaurantLocation?.lat);
    const lng2 = Number(restaurantLocation?.lng);

    let selectedPartner = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const partner of partners) {
        const lat1 = Number(partner.location?.lat);
        const lng1 = Number(partner.location?.lng);

        if (Number.isNaN(lat1) || Number.isNaN(lng1) || Number.isNaN(lat2) || Number.isNaN(lng2)) {
            continue;
        }

        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        if (distance < minDistance) {
            minDistance = distance;
            selectedPartner = partner;
        }
    }

    if (!selectedPartner) {
        return null;
    }

    selectedPartner.currentOrders += 1;
    await selectedPartner.save();

    await Order.findByIdAndUpdate(orderId, { deliveryPartner: selectedPartner._id });

    return selectedPartner;
}

module.exports = findNearestRider;
