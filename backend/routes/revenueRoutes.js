const express = require("express");
const {
  getRevenueStatistics,
  createRevenueStatistics,
} = require("../controllers/revenueController");

const router = express.Router();

router.get("/revenue", getRevenueStatistics); // Get revenue statistics
router.post("/revenue", createRevenueStatistics); // Add new revenue statistics

module.exports = router;
