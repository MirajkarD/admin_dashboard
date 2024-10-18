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

module.exports = {
  createBooking,
  getActiveReservations,
  getUpcomingReservations,
};
