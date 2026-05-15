const SurgeSetting = require("../models/SurgeSetting");

exports.getSurgeSettings = async (req, res) => {
    try {
        const results = await SurgeSetting.find();
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createSurgeSettings = async (req, res) => {
    try {
        const created = await SurgeSetting.create(req.body);
        res.status(201).json({ success: true, data: created });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSurgeSettings = async (req, res) => {
    try {
        const updated = await SurgeSetting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
