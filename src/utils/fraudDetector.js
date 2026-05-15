const Order = require("../models/order");
const FraudLog = require("../models/FraudLog");
const Coupon = require("../models/Coupon");

async function checkSuspiciousActivity(userId, orderId) {
    const reasons = [];
    let threatLevel = 0;
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentOrdersCount = await Order.countDocuments({ user: userId, createdAt: { $gte: tenMinutesAgo } });
    if (recentOrdersCount > 3) {
        reasons.push("Multiple orders in short time");
        threatLevel += 3;
    }

    const recentCancelledCount = await Order.countDocuments({ user: userId, orderStatus: "Cancelled", updatedAt: { $gte: oneHourAgo } });
    if (recentCancelledCount > 2) {
        reasons.push("Repeated cancellations");
        threatLevel += 3;
    }

    const recentFailedPayments = await Order.countDocuments({ user: userId, paymentStatus: "Failed", updatedAt: { $gte: oneDayAgo } });
    if (recentFailedPayments > 3) {
        reasons.push("Excessive failed payments");
        threatLevel += 2;
    }

    const recentCouponCount = await Coupon.countDocuments({ usedBy: userId, updatedAt: { $gte: oneDayAgo } });
    if (recentCouponCount > 3) {
        reasons.push("Abnormal coupon usage");
        threatLevel += 3;
    }

    const isFlagged = threatLevel >= 5;

    const activityLog = await FraudLog.create({ user: userId, orderId: orderId || null, riskScore: threatLevel, reasons, isFlagged });

    return { isFlagged, riskScore: threatLevel, reasons, fraudLog: activityLog };
}

module.exports = checkSuspiciousActivity;
