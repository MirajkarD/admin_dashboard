const OccupancyStats = require("../models/statistics/OccupancyStats");
const UsagePatterns = require("../models/statistics/UsagePatterns");
const RevenueStats = require("../models/statistics/RevenueStats");

const getOccupancyStats = async (req, res) => {
  try {
    const stats = await OccupancyStats.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching occupancy stats", error });
  }
};

const getUsagePatterns = async (req, res) => {
  try {
    const usage = await UsagePatterns.find();
    res.status(200).json(usage);
  } catch (error) {
    res.status(500).json({ message: "Error fetching usage patterns", error });
  }
};

module.exports = {
  getOccupancyStats,
  getUsagePatterns,
};
