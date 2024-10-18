const Payment = require("../models/Payment");

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

// Get payment issues (failed or pending)
const getPaymentIssues = async (req, res) => {
  try {
    const paymentIssues = await Payment.find({
      status: { $in: ["failed", "pending"] },
    });
    res.status(200).json(paymentIssues);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment issues", error });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentIssues,
};
