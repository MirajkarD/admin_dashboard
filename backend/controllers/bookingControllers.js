const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

const getActiveReservations = async (req, res) => {
  try {
    const activeBookings = await Booking.find({ status: "active" });
    res.status(200).json(activeBookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching active reservations", error });
  }
};

const getUpcomingReservations = async (req, res) => {
  try {
    const upcomingBookings = await Booking.find({
      startTime: { $gte: new Date() },
    });
    res.status(200).json(upcomingBookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching upcoming reservations", error });
  }
};

const getBookingCancellations = async (req, res) => {
  try {
    const cancellations = await Booking.find({ status: "cancelled" });
    res.status(200).json(cancellations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cancellations", error });
  }
};

// Fetch active bookings for a particular user
const getActiveBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const activeBookings = await Booking.find({
      userId: userId,
      status: "active",
    });
    res.status(200).json(activeBookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active bookings", error });
  }
};

// Fetch upcoming bookings for a particular user
const getUpcomingBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const upcomingBookings = await Booking.find({
      userId: userId,
      startTime: { $gte: new Date() }, // Filter for bookings with start time in the future
    });
    res.status(200).json(upcomingBookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching upcoming bookings", error });
  }
};

module.exports = {
  createBooking,
  getActiveReservations,
  getUpcomingReservations,
  getBookingCancellations,
  getActiveBookingsByUser,
  getUpcomingBookingsByUser,
};
