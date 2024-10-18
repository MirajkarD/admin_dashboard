const express = require("express");
const {
  createBooking,
  getActiveReservations,
  getUpcomingReservations,
} = require("../controllers/bookingControllers");
const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings/active", getActiveReservations);
router.get("/bookings/upcoming", getUpcomingReservations);

module.exports = router;
