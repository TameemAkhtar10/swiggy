const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { createCoupon, applyCoupon, getActiveCoupons } = require("../controllers/couponController");

router.post("/apply", protect, authorize("user"), applyCoupon);
router.post("/admin/create", protect, authorize("admin"), createCoupon);
router.get("/admin/all", protect, authorize("admin"), getActiveCoupons);

module.exports = router;
