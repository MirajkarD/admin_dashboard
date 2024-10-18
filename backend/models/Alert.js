const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError
const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);

module.exports = Alert;
