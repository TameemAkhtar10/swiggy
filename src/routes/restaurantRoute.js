const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getMyRestaurant,
  updateRestaurant,
  getAllRestaurants,
  searchRestaurants,
  getSuggestedRestaurants,
} = require("../controllers/restaurantController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, createRestaurant);
router.get("/my", protect, getMyRestaurant);
router.put("/:id", protect, updateRestaurant);
router.get("/recommendations/:userId", protect, authorize("user"), getSuggestedRestaurants);
router.get("/search", searchRestaurants);
router.get("/", getAllRestaurants);

module.exports = router;
