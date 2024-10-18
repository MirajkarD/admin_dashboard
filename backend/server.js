const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const slotRoutes = require("./routes/slotRoutes");
const paymentRoute = require("./routes/paymentRoutes");
const revenueRoutes = require("./routes/revenueRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");

dotenv.config(); // Load environment variables before anything else

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware for parsing JSON
app.use("/api", userRoutes); // User routes
app.use("/api", bookingRoutes); // Booking routes
app.use("/api", slotRoutes); // Slot routes
app.use("/api", paymentRoute); // Corrected payment route
app.use("/api", revenueRoutes); // Revenue routes
app.use("/api/statistics", statisticsRoutes);
// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
