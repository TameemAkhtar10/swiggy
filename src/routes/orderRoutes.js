const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const {
  placeOrder,
  getMyOrders,
  getRestaurantOrders,
  updateOrderStatus,
  mockPayment,
  cancelOrder,
  calculateDeliveryFeeHandler,
  getOrderById,
} = require("../controllers/orderController");

router.use(protect);
router.post("/", authorize("user"), placeOrder);
router.get("/my", authorize("user"), getMyOrders);
router.post("/verify", authorize("user"), mockPayment);
router.post("/cancel/:orderId", authorize("user"), cancelOrder);
router.get("/calculate-delivery-fee", authorize("user"), calculateDeliveryFeeHandler);
router.get("/restaurant", authorize("restaurant"), getRestaurantOrders);
router.put("/:id/status", authorize("restaurant", "admin"), updateOrderStatus);
router.get("/:orderId", getOrderById);

module.exports = router;