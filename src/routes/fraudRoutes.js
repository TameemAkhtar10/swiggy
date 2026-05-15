const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { getFlaggedOrders, reviewFraudOrder } = require("../controllers/fraudController");

router.use(protect);
router.use(authorize("admin"));

router.get("/fraud/orders", getFlaggedOrders);
router.put("/fraud/review/:fraudLogId", reviewFraudOrder);

module.exports = router;
