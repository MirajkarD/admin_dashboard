const mongoose = require("mongoose");

const revenueStatsSchema = new mongoose.Schema({
  dailyRevenue: { type: Number, required: true },
  weeklyRevenue: { type: Number, required: true },
  monthlyRevenue: { type: Number, required: true },
});

// Avoid OverwriteModelError
const RevenueStats =
  mongoose.models.RevenueStats ||
  mongoose.model("RevenueStats", revenueStatsSchema);

module.exports = RevenueStats;
