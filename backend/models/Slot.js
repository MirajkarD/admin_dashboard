const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

// Avoid OverwriteModelError
const Slot = mongoose.models.Slot || mongoose.model("Slot", slotSchema);

module.exports = Slot;
