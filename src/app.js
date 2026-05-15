const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoute");
const cookie = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", require("./routes/menuRoute"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/delivery", require("./routes/deliveryRoutes"));
app.use("/api/admin", require("./routes/AdminRoutes"));
app.use("/api/admin", require("./routes/fraudRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Swiggy API" });
});

module.exports = app;
