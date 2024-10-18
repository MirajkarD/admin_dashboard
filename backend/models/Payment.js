const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

module.exports = Payment;
