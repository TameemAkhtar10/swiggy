const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const findNearestRider = require("../utils/assignDeliveryPartner");

exports.registerAsPartner = async (req, res) => {
    try {
        const partner = await DeliveryPartner.create({
            user: req.user._id,
            location: req.body.location,
        });
        res.status(201).json({ success: true, data: partner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.setAvailability = async (req, res) => {
    try {
        const partner = await DeliveryPartner.findOne({ user: req.user._id });
        partner.isAvailable = req.body.isAvailable;
        await partner.save();
        res.status(200).json({ success: true, data: partner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.myDeliveries = async (req, res) => {
   try {
    const partner = await DeliveryPartner.findOne({ user: req.user._id });
    if (!partner) {
        return res.status(404).json({ success: false, message: "Delivery partner not found" });
    }
    const orders = await Order.find({ deliveryPartner: partner._id });
    res.status(200).json({ success: true, data: orders });
} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
};

exports.declineOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        const partner = await DeliveryPartner.findById(order.deliveryPartner);
        partner.currentOrders = Math.max(0, partner.currentOrders - 1);
        await partner.save();

        const restaurant = await Restaurant.findById(order.restaurant);
        await findNearestRider(order._id, restaurant?.location);

        const updatedOrder = await Order.findById(order._id).populate("deliveryPartner");
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
