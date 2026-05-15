# Swiggy Backend Clone

Node.js + Express backend for a food delivery platform with fraud detection, real-time order tracking, smart delivery assignment, and dynamic surge pricing.

## Tech Stack

Node.js, Express, MongoDB, Mongoose, JWT, Socket.io

## Setup

```bash
npm install
npm run dev
```

Create `.env`:
```
PORT=3000
MONGO_URI=mongodb+srv://tamimakhtar1010_db_user:hVwE5bGVegMtmFXj@internship.hajfvol.mongodb.net/Swiggy
JWT_SECRET=7e33228a027586be313e918238f1285a31febd4d41dc3840a51e12012d414cb6
```

## Test Credentials

- Admin: admin@swiggy.com / Admin@123
- Restaurant Owner: amit@swiggy.com / Test@123
- User: rahul@swiggy.com / Test@123

## Features

- Fraud Detection and Order Validation
- Advanced Restaurant Search and Filtering
- Dynamic Surge Pricing
- Smart Delivery Partner Assignment
- Real-Time Order Status via WebSockets
- Restaurant Recommendation System

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Restaurants
- GET /api/restaurants
- GET /api/restaurants/search
- GET /api/restaurants/my
- GET /api/restaurants/recommendations/:userId
- POST /api/restaurants
- PUT /api/restaurants/:id

### Menu
- GET /api/menu/:restaurantId
- POST /api/menu
- PUT /api/menu/:id
- DELETE /api/menu/:id

### Cart
- GET /api/cart
- POST /api/cart
- DELETE /api/cart/:itemId

### Orders
- POST /api/orders
- GET /api/orders/my
- POST /api/orders/verify
- POST /api/orders/cancel/:orderId
- PUT /api/orders/:id/status
- GET /api/orders/calculate-delivery-fee
- GET /api/orders/:orderId

### Delivery
- POST /api/delivery/register
- PUT /api/delivery/set-status
- GET /api/delivery/my-assignments
- POST /api/delivery/decline/:orderId

### Coupons
- POST /api/coupons/apply
- POST /api/coupons/admin/create
- GET /api/coupons/admin/all

### Admin
- GET /api/admin
- PUT /api/admin/users/:id/block
- PUT /api/admin/restaurant/:id/approve
- GET /api/admin/orders
- GET /api/admin/statistics
- POST /api/admin/restaurants/create
- PUT /api/admin/restaurants/update/:restaurantId
- GET /api/admin/fraud/orders
- PUT /api/admin/fraud/review/:fraudLogId
- GET /api/admin/surge-settings
- POST /api/admin/surge-settings
- PUT /api/admin/surge-settings/:id
