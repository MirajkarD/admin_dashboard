const express = require("express");
const {
  createBooking,
  getActiveReservations,
  getUpcomingReservations,
  getBookingCancellations,
  getActiveBookingsByUser, // Active bookings by user
  getUpcomingBookingsByUser, // Upcoming bookings by user
} = require("../controllers/bookingControllers");

const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings/active", getActiveReservations);
router.get("/bookings/upcoming", getUpcomingReservations);
router.get("/bookings/cancellations", getBookingCancellations);

// Routes for a specific user's bookings
router.get("/bookings/active/:userId", getActiveBookingsByUser); // Active bookings by user
router.get("/bookings/upcoming/:userId", getUpcomingBookingsByUser); // Upcoming bookings by user

module.exports = router;
