const Revenue = require("../models/Revenue");

const getRevenueStatistics = async (req, res) => {
  try {
    const revenueStats = await Revenue.find();
    res.status(200).json(revenueStats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching revenue statistics", error });
  }
};

const createRevenueStatistics = async (req, res) => {
  try {
    const newRevenue = new Revenue(req.body);
    await newRevenue.save();
    res.status(201).json(newRevenue);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating revenue statistics", error });
  }
};

module.exports = {
  getRevenueStatistics,
  createRevenueStatistics,
};
