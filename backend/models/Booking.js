const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotNumber: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, default: "active" },
});

// Avoid OverwriteModelError
const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

module.exports = Booking;
