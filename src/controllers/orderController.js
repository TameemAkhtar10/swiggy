const Order = require("../models/order.js");
const Cart = require("../models/Cart");
const restaurant = require("../models/restaurant");
const checkSuspiciousActivity = require("../utils/fraudDetector");
const getDeliveryCharge = require("../utils/surgeCalculator");
const findNearestRider = require("../utils/assignDeliveryPartner");
const broadcastOrderUpdate = require("../utils/notifyOrderStatus");
const UserPreference = require("../models/UserPreference");

exports.placeOrder = async (req, res) => {
  try {
    const { deliveryAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.menuItem")
      .populate("restaurant");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    if (!cart.restaurant.isApproved) {
      return res.status(400).json({ success: false, message: "Restaurant not approved" });
    }

    const items = cart.items.map(item => ({
      menuItem: item.menuItem._id,
      name: item.menuItem.name,
      price: item.menuItem.price,
      quantity: item.quantity
    }));

    const totalAmount = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const fraudResult = await checkSuspiciousActivity(req.user._id, null);

    if (fraudResult.isFlagged) {
      return res.status(403).json({ success: false, message: "Order flagged for suspicious activity" });
    }

    const order = await Order.create({
      user: req.user._id,
      restaurant: cart.restaurant._id,
      items,
      totalAmount,
      deliveryAddress
    });

    broadcastOrderUpdate(order._id, "Pending");

    const restaurantDoc = await restaurant.findById(order.restaurant);

    let preference = await UserPreference.findOne({ user: req.user._id });
    if (!preference) {
      preference = await UserPreference.create({ user: req.user._id });
    }

    if (restaurantDoc?.cuisine && !preference.favoriteCuisines.includes(restaurantDoc.cuisine)) {
      preference.favoriteCuisines.push(restaurantDoc.cuisine);
    }

    preference.orderCount += 1;
    preference.lastOrderedAt = new Date();
    await preference.save();

    const assignedPartner = await findNearestRider(order._id, restaurantDoc?.location);

    if (assignedPartner) {
      order.deliveryPartner = assignedPartner._id;
    }

    if (fraudResult.fraudLog) {
      fraudResult.fraudLog.orderId = order._id;
      await fraudResult.fraudLog.save();
    }

    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: assignedPartner ? { order, deliveryPartner: assignedPartner } : order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRestaurantOrders = async (req, res) => {
  try {
    const Restaurant = await restaurant.findOne({ owner: req.user._id });
    if (!Restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    const orders = await Order.find({ restaurant: Restaurant._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.mockPayment = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  order.paymentStatus = "Paid";
  order.orderStatus = "Confirmed";
  await order.save();
  res.status(200).json({ success: true, message: "Mock payment successful" });
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate("restaurant");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (req.user.role === "admin") {
      order.orderStatus = status;
      await order.save();
      broadcastOrderUpdate(order._id, order.orderStatus);
      return res.status(200).json({ success: true, message: "Order status updated", data: order });
    }
    const Restaurant = await restaurant.findOne({ owner: req.user._id });
    if (!Restaurant || Restaurant._id.toString() !== order.restaurant._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    order.orderStatus = status;
    await order.save();
    broadcastOrderUpdate(order._id, order.orderStatus);
    res.status(200).json({ success: true, message: "Order status updated", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    if (order.orderStatus === "Cancelled" || order.orderStatus === "Delivered") {
      return res.status(400).json({ success: false, message: "Cannot cancel this order" });
    }
    order.orderStatus = "Cancelled";
    await order.save();
    await checkSuspiciousActivity(req.user._id, order._id);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.calculateDeliveryFeeHandler = async (req, res) => {
  try {
    const { deliveryFee, isSurge, surgeMultiplier } = await getDeliveryCharge();
    res.status(200).json({ success: true, data: { deliveryFee, isSurge, surgeMultiplier } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("user").populate("restaurant").populate("deliveryPartner");
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};