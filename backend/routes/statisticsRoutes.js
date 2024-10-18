const express = require("express");
const { getOccupancyStats, getUsagePatterns } = require("../controllers");

const router = express.Router();

router.get("/occupancy", getOccupancyStats);
router.get("/usage", getUsagePatterns);

module.exports = router;
