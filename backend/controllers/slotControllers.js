const Slot = require("../models/Slot");

const getAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await Slot.find({ isAvailable: true });
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available slots", error });
  }
};

module.exports = {
  getAvailableSlots,
};
