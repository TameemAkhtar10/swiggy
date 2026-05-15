const FraudLog = require("../models/FraudLog");
const User = require("../models/User");

exports.getFlaggedOrders = async (req, res) => {
    try {
        const logs = await FraudLog.find({ isFlagged: true })
            .populate("user", "name email")
            .populate("orderId");

        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.reviewFraudOrder = async (req, res) => {
    try {
        const { action } = req.body;

        const log = await FraudLog.findById(req.params.fraudLogId);

        if (!log) {
            return res.status(404).json({ success: false, message: "Fraud log not found" });
        }

        log.reviewStatus = action;
        await log.save();

        if (action === "rejected") {
            const user = await User.findById(log.user);
            if (user) {
                user.isblocked = true;
                await user.save();
            }
        }

        res.status(200).json({ success: true, data: log });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
