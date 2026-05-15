const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getallUsers,
  toggleBlockUser,
  approveRestaurant,
  getAllOrders,
  getPlatformStatistics,
} = require("../controllers/AdminController");

const {
  adminCreateRestaurant,
  adminUpdateRestaurant,
} = require("../controllers/restaurantController");

const { getFlaggedOrders, reviewFraudOrder } = require("../controllers/fraudController");
const { getSurgeSettings, createSurgeSettings, updateSurgeSettings } = require("../controllers/surgeController");

router.use(protect);
router.use(authorize("admin"));

router.get("/", getallUsers);
router.put("/users/:id/block", toggleBlockUser);
router.put("/restaurant/:id/approve", approveRestaurant);
router.post("/restaurants/create", adminCreateRestaurant);
router.put("/restaurants/update/:restaurantId", adminUpdateRestaurant);
router.get("/statistics", getPlatformStatistics);
router.get("/orders", getAllOrders);
router.get("/fraud/orders", getFlaggedOrders);
router.put("/fraud/review/:fraudLogId", reviewFraudOrder);
router.get("/surge-settings", getSurgeSettings);
router.post("/surge-settings", createSurgeSettings);
router.put("/surge-settings/:id", updateSurgeSettings);

module.exports = router;