# Swiggy Backend Clone

A Node.js + Express backend for a food delivery platform with fraud detection, real-time order tracking, smart delivery assignment, and dynamic surge pricing.

## Tech Stack

Node.js, Express, MongoDB, Mongoose, JWT, Socket.io

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with:
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://tamimakhtar1010_db_user:hVwE5bGVegMtmFXj@internship.hajfvol.mongodb.net/Swiggy
   JWT_SECRET=7e33228a027586be313e918238f1285a31febd4d41dc3840a51e12012d414cb6
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## Test Credentials

- **Admin**: admin@swiggy.com / Admin@123
- **Restaurant Owner**: amit@swiggy.com / Test@123
- **User**: rahul@swiggy.com / Test@123

## Features

- Fraud Detection and Order Validation
- Advanced Restaurant Search and Filtering
- Dynamic Surge Pricing
- Smart Delivery Partner Assignment
- Real-Time Order Status via WebSockets
- Restaurant Recommendation System

## API Endpoints

**Auth**: `POST /api/auth/register` • `POST /api/auth/login`

**Restaurants**: `GET /api/restaurants/search` • `GET /api/restaurants/recommendations/:userId`

**Orders**: `POST /api/orders` • `GET /api/orders/my` • `POST /api/orders/cancel/:orderId` • `GET /api/orders/calculate-delivery-fee`

**Delivery**: `POST /api/delivery/register` • `PUT /api/delivery/set-status`

**Coupons**: `POST /api/coupons/apply` • `POST /api/coupons/admin/create`

**Admin**: `GET /api/admin/fraud/orders` • `GET /api/admin/surge-settings` • `GET /api/admin/orders`
