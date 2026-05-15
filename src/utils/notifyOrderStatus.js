function broadcastOrderUpdate(orderId, status) {
    const { io } = require("../server");

    if (!io) {
        return;
    }

    io.to(orderId.toString()).emit("orderStatusUpdate", {
        orderId,
        status,
        updatedAt: new Date(),
    });
}

module.exports = broadcastOrderUpdate;