const express = require("express");
const { getAvailableSlots } = require("../controllers/slotControllers");
const router = express.Router();

router.get("/slots/available", getAvailableSlots);

module.exports = router;
