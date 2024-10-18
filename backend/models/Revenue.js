const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  dailyRevenue: { type: Number, required: true },
  weeklyRevenue: { type: Number, required: true },
  monthlyRevenue: { type: Number, required: true },
});

const Revenue =
  mongoose.models.Revenue || mongoose.model("Revenue", revenueSchema);

module.exports = Revenue;
