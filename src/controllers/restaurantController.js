const restaurant = require("../models/restaurant");
const UserPreference = require("../models/UserPreference");

exports.getSuggestedRestaurants = async (req, res) => {
  try {
    const preference = await UserPreference.findOne({ user: req.params.userId });

    if (!preference) {
      const results = await restaurant.find({ isApproved: true }).sort({ rating: -1 }).limit(5);
      return res.status(200).json({ success: true, data: results });
    }

    const favoriteCuisines = preference.favoriteCuisines || [];

    const results = await restaurant.aggregate([
      { $match: { isApproved: true } },
      {
        $addFields: {
          cuisineScore: {
            $cond: [{ $in: ["$cuisine", favoriteCuisines] }, 2, 0],
          },
        },
      },
      {
        $addFields: {
          recommendationScore: {
            $add: ["$cuisineScore", "$rating", { $divide: ["$popularity", 10] }],
          },
        },
      },
      { $sort: { recommendationScore: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchRestaurants = async (req, res) => {
  try {
    const { search, cuisine, rating, maxDeliveryTime, minPrice, maxPrice, isVegetarian, sortBy } = req.query;
    const filter = { isApproved: true };

    if (search) {
      filter.$text = { $search: search };
    }

    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: "i" };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    if (maxDeliveryTime) {
      filter.estimatedDeliveryTime = { $lte: Number(maxDeliveryTime) };
    }

    if (minPrice && maxPrice) {
      filter.priceRange = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    if (isVegetarian === "true") {
      filter.isVegetarian = true;
    }

    let sort = { createdAt: -1 };
    if (sortBy === "rating") {
      sort = { rating: -1 };
    } else if (sortBy === "popularity") {
      sort = { popularity: -1 };
    } else if (sortBy === "deliveryTime") {
      sort = { estimatedDeliveryTime: 1 };
    }

    const results = await restaurant.find(filter).sort(sort);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    if (req.user.role !== "restaurant") {
      return res.status(403).json({
        success: false,
        message: "Only restaurant owners can create restaurants",
      });
    }
    const existingRestaurant = await restaurant.findOne({
      owner: req.user._id,
    });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "You already have a restaurant registered",
      });
    }
    const createdRestaurant = await restaurant.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: createdRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating restaurant",
      error: error.message,
    });
  }
};

exports.getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "You don't have a restaurant registered",
      });
    }
    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching restaurant",
      error: error.message,
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "You don't have a restaurant registered",
      });
    }
    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this restaurant",
      });
    }
    const updatedRestaurant = await restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating restaurant",
      error: error.message,
    });
  }
};
exports.getAllRestaurants = async (req, res) => {
  try {
    const { city, page = 1, limit = 10 } = req.query;
    const query = { isApproved: true };
    if (city) {
      query.city = city;
    }
    const restaurants = await restaurant
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching restaurants",
      error: error.message,
    });
  }
};

exports.adminCreateRestaurant = async (req, res) => {
  try {
    const createdRestaurant = await restaurant.create({
      ...req.body,
      isApproved: true,
    });

    res.status(201).json({
      success: true,
      data: createdRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.adminUpdateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      { new: true },
    );

    res.status(200).json({
      success: true,
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
