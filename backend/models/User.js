const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  vehicle: {
    type: { type: String, required: true },
    licensePlate: { type: String, required: true },
  },
  status: { type: String, default: "active" },
});

// Avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
