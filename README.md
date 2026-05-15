# 🍕 Swiggy Backend Clone

A robust Node.js and Express-based backend for a food delivery platform with real-time order tracking, advanced fraud detection, smart delivery partner assignment, and dynamic surge pricing.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | 14+ | Runtime environment |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | 4.x | Web framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=flat-square&logo=mongodb&logoColor=white) | 4.x | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) | 6.x | ODM |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | - | Authentication |
| ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white) | 4.x | Real-time communication |

---

## ✨ Features

- **🔐 Fraud Detection & Order Validation** — Real-time suspicious activity detection with risk scoring and audit logging
- **🔍 Advanced Restaurant Search & Filtering** — Search by cuisine, price range, veg/non-veg, and ratings
- **💰 Dynamic Surge Pricing** — Automatic delivery fee calculation based on peak hours
- **🚴 Smart Delivery Partner Assignment** — Haversine-based nearest rider assignment with load balancing
- **📡 Real-Time Order Status** — WebSocket-driven live notifications for order updates
- **⭐ Restaurant Recommendation System** — Personalized suggestions based on user order history

---

## 🧪 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@swiggy.com | Admin@123 |
| Restaurant Owner | amit@swiggy.com | Test@123 |
| Customer | rahul@swiggy.com | Test@123 |

---

## 📋 API Routes

### 🔑 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |

### 🏪 Restaurants

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/restaurants` | List all restaurants | No |
| GET | `/api/restaurants/search` | Search and filter restaurants | No |
| GET | `/api/restaurants/recommendations/:userId` | Get personalized recommendations | User |
| POST | `/api/restaurants` | Create restaurant | Restaurant |
| GET | `/api/restaurants/my` | Get my restaurant | Restaurant |
| PUT | `/api/restaurants/:id` | Update restaurant details | Restaurant |

### 🍽️ Menu

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/menu/:restaurantId` | Get restaurant menu | No |
| POST | `/api/menu` | Add menu item | Restaurant |
| PUT | `/api/menu/:id` | Update menu item | Restaurant |
| DELETE | `/api/menu/:id` | Delete menu item | Restaurant |

### 🛒 Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/cart` | Get user cart | User |
| POST | `/api/cart` | Add item to cart | User |
| DELETE | `/api/cart/:itemId` | Remove item from cart | User |
| PUT | `/api/cart/:itemId` | Update item quantity | User |
| DELETE | `/api/cart/clear` | Clear entire cart | User |

### 📦 Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/orders` | Place new order | User |
| GET | `/api/orders/my` | Get my orders | User |
| GET | `/api/orders/:orderId` | Get order details | User |
| POST | `/api/orders/verify` | Mock payment verification | User |
| POST | `/api/orders/cancel/:orderId` | Cancel order | User |
| PUT | `/api/orders/:id/status` | Update order status | Restaurant/Admin |
| GET | `/api/orders/calculate-delivery-fee` | Calculate delivery charge | User |

### 🚚 Delivery Partners

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/delivery/register` | Register as delivery partner | User |
| PUT | `/api/delivery/set-status` | Set availability status | User |
| GET | `/api/delivery/my-assignments` | Get my assigned orders | User |
| POST | `/api/delivery/decline/:orderId` | Decline assigned order | User |

### 🎟️ Coupons

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/coupons/apply` | Apply coupon to order | User |
| POST | `/api/coupons/admin/create` | Create coupon | Admin |
| GET | `/api/coupons/admin/all` | List all coupons | Admin |

### 👨‍💼 Admin

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/admin` | List all users | Admin |
| PUT | `/api/admin/users/:id/block` | Block user account | Admin |
| PUT | `/api/admin/restaurant/:id/approve` | Approve restaurant | Admin |
| GET | `/api/admin/orders` | Get all orders | Admin |
| GET | `/api/admin/statistics` | Platform statistics | Admin |
| POST | `/api/admin/restaurants/create` | Create restaurant | Admin |
| PUT | `/api/admin/restaurants/update/:restaurantId` | Update restaurant | Admin |
| GET | `/api/admin/fraud/orders` | Get flagged orders | Admin |
| PUT | `/api/admin/fraud/review/:fraudLogId` | Review fraud case | Admin |
| GET | `/api/admin/surge-settings` | Get surge pricing settings | Admin |
| POST | `/api/admin/surge-settings` | Create surge settings | Admin |
| PUT | `/api/admin/surge-settings/:id` | Update surge settings | Admin |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd swiggy-_backend-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env in project root
   MONGO_URI=mongodb://localhost:27017/swiggy
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

---

## 📁 Project Structure

```
src/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/              # Request handlers
│   ├── authController.js
│   ├── orderController.js
│   ├── restaurantController.js
│   ├── menuController.js
│   ├── cartController.js
│   ├── couponController.js
│   ├── deliveryController.js
│   ├── fraudController.js
│   └── AdminController.js
├── middleware/
│   └── authMiddleware.js     # JWT authentication & authorization
├── models/                   # Mongoose schemas
│   ├── User.js
│   ├── Restaurant.js
│   ├── Menu.js
│   ├── Order.js
│   ├── Cart.js
│   ├── Coupon.js
│   ├── DeliveryPartner.js
│   ├── FraudLog.js
│   ├── SurgeSetting.js
│   └── UserPreference.js
├── routes/                   # API endpoints
│   ├── authRoutes.js
│   ├── restaurantRoute.js
│   ├── menuRoute.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── couponRoutes.js
│   ├── deliveryRoutes.js
│   ├── AdminRoutes.js
│   └── fraudRoutes.js
├── utils/                    # Helper functions
│   ├── fraudDetector.js      # Fraud detection logic
│   ├── surgeCalculator.js    # Surge pricing calculation
│   ├── assignDeliveryPartner.js  # Rider assignment
│   └── notifyOrderStatus.js  # WebSocket notifications
├── app.js                    # Express app setup
└── server.js                 # Server entry point with Socket.io
```

---

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```bash
Authorization: Bearer <your_jwt_token>
```

### User Roles
- `user` — Customer placing orders
- `restaurant` — Restaurant owner managing menu and orders
- `admin` — Platform administrator

---

## 🔄 Real-Time Features

### WebSocket Events
- **Connection**: `joinOrder` — Join an order room for live updates
- **Broadcast**: `orderStatusUpdate` — Receive order status changes in real-time

Example client-side listener:
```javascript
socket.on('joinOrder', (orderId) => {
  socket.join(orderId.toString());
});

socket.on('orderStatusUpdate', (data) => {
  console.log(`Order ${data.orderId} status: ${data.status}`);
});
```

---

## 🛡️ Key Security Features

- **JWT Authentication** — Secure token-based authentication
- **Role-Based Access Control** — Endpoint protection by user role
- **Fraud Detection** — Real-time suspicious activity monitoring
- **Password Hashing** — Bcrypt-based secure password storage
- **Input Validation** — Request data validation before processing

---

## 📊 Database Models

The system uses 10 main data models:
- **User** — Customer and partner profiles
- **Restaurant** — Restaurant information and approval status
- **Menu** — Menu items with pricing and availability
- **Order** — Order details with status tracking
- **Cart** — User shopping carts with items
- **Coupon** — Discount codes and usage tracking
- **DeliveryPartner** — Rider profiles and availability
- **FraudLog** — Audit trail for suspicious activities
- **SurgeSetting** — Dynamic pricing configuration
- **UserPreference** — User order history and cuisine preferences

---

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test API endpoints. Start with authentication:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Test@123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test@123"}'
```

---

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* data object */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🐛 Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running and `MONGO_URI` is correct.

**JWT Token Expired**: Re-login to get a new token.

**Socket.io Connection Failed**: Verify CORS settings and WebSocket availability.

---

## 📄 License

This project is provided as-is for educational and development purposes.

---

## 👨‍💻 Developer Notes

- All async operations use async/await patterns
- Consistent JSON response structure across all endpoints
- Error handling with appropriate HTTP status codes
- Haversine formula for geolocation-based rider assignment
- MongoDB aggregation pipeline for analytics and recommendations

---

**Version**: 1.0.0  
**Last Updated**: May 2026
