const Coupon = require("../models/Coupon");
const Order = require("../models/order");

exports.createCoupon = async (req, res) => {
    try {
        const { code, discountPercent, maxUses, expiresAt, isActive } = req.body;
        const coupon = await Coupon.create({ code, discountPercent, maxUses, expiresAt, isActive });
        res.status(201).json({ success: true, data: coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.applyCoupon = async (req, res) => {
    try {
        const { code, orderId } = req.body;
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        }

        const now = new Date();
        if (!coupon.isActive || coupon.expiresAt <= now) {
            return res.status(400).json({ success: false, message: "Coupon not valid" });
        }

        if (coupon.usedCount >= coupon.maxUses) {
            return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
        }

        if (coupon.usedBy.find(u => u.toString() === req.user._id.toString())) {
            return res.status(400).json({ success: false, message: "User already used this coupon" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        const discounted = Math.round((order.totalAmount * (1 - coupon.discountPercent / 100)) * 100) / 100;
        order.totalAmount = discounted;
        coupon.usedBy.push(req.user._id);
        coupon.usedCount += 1;
        await coupon.save();
        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getActiveCoupons = async (req, res) => {
    try {
        const now = new Date();
        const coupons = await Coupon.find({ isActive: true, expiresAt: { $gt: now } });
        res.status(200).json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
