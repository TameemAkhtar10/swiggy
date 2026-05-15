const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    registerAsPartner,
    setAvailability,
    myDeliveries,
    declineOrder,
} = require("../controllers/deliveryController");

router.use(protect);

router.post("/register", registerAsPartner);
router.put("/set-status", setAvailability);
router.get("/my-assignments", myDeliveries);
router.post("/decline/:orderId", declineOrder);

module.exports = router;
