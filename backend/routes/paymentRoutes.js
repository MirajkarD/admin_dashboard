const express = require("express");
const {
  createPayment,
  getPayments,
  getPaymentIssues,
} = require("../controllers/paymentController");

const router = express.Router();

// Create a new payment
router.post("/payments", createPayment);

// Get all payments
router.get("/payments", getPayments);

// Get payment issues
router.get("/payments/issues", getPaymentIssues);

module.exports = router;
