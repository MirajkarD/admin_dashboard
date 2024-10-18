const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Slot = require("./models/Slot");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");
const Alert = require("./models/Alert");
const OccupancyStats = require("./models/statistics/OccupancyStats");
const UsagePatterns = require("./models/statistics/UsagePatterns");
const RevenueStats = require("./models/statistics/RevenueStats");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

// Generate Dummy Data
const generateData = async () => {
  // Clear existing collections
  await User.deleteMany({});
  await Slot.deleteMany({});
  await Booking.deleteMany({});
  await Payment.deleteMany({});
  await Alert.deleteMany({});
  await OccupancyStats.deleteMany({});
  await UsagePatterns.deleteMany({});
  await RevenueStats.deleteMany({});

  // Create Users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      contact: `123456789${i}`,
      vehicle: {
        type: ["Car", "Motorcycle", "Truck"][Math.floor(Math.random() * 3)],
        licensePlate: `XYZ ${Math.floor(Math.random() * 9000) + 1000}`,
      },
      status: Math.random() > 0.5 ? "active" : "inactive",
    });
  }
  const insertedUsers = await User.insertMany(users);
  console.log(`${insertedUsers.length} users created`);

  // Create Slots
  const slots = [];
  for (let i = 1; i <= 20; i++) {
    slots.push({
      slotNumber: `Slot ${i}`,
      isAvailable: Math.random() > 0.5,
    });
  }
  const insertedSlots = await Slot.insertMany(slots);
  console.log(`${insertedSlots.length} slots created`);

  // Create Bookings
  const bookings = [];
  for (let i = 0; i < 50; i++) {
    const randomUser =
      insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
    const randomSlot =
      insertedSlots[Math.floor(Math.random() * insertedSlots.length)];
    const startTime = new Date();
    const endTime = new Date(
      startTime.getTime() + Math.random() * (7 * 24 * 60 * 60 * 1000)
    ); // Random duration up to 7 days

    bookings.push({
      userId: randomUser._id,
      slotNumber: randomSlot.slotNumber,
      startTime,
      endTime,
      status: ["active", "completed", "cancelled"][
        Math.floor(Math.random() * 3)
      ],
    });
  }
  const insertedBookings = await Booking.insertMany(bookings);
  console.log(`${insertedBookings.length} bookings created`);

  // Create Payments
  const payments = [];
  for (const booking of insertedBookings) {
    payments.push({
      bookingId: booking._id,
      amount: Math.floor(Math.random() * 100) + 20, // Random amount between 20 and 119
      status: ["paid", "pending", "failed"][Math.floor(Math.random() * 3)],
      date: new Date(),
    });
  }
  const insertedPayments = await Payment.insertMany(payments);
  console.log(`${insertedPayments.length} payments created`);

  // Create Occupancy Statistics
  const occupancyStats = {
    currentOccupancyRate: Math.floor(Math.random() * 100), // Random occupancy rate
    peakOccupancy: Math.floor(Math.random() * 100), // Random peak occupancy
    historicalTrends: [
      { month: "January", occupancy: Math.floor(Math.random() * 100) },
      { month: "February", occupancy: Math.floor(Math.random() * 100) },
      { month: "March", occupancy: Math.floor(Math.random() * 100) },
      // Add more months as needed
    ],
  };
  await OccupancyStats.create(occupancyStats);
  console.log("Occupancy statistics created");

  // Create Usage Patterns
  const usagePatterns = {
    averageParkingDuration: Math.floor(Math.random() * 120) + 30, // Random average parking duration between 30 and 150 minutes
    frequencyOfUse: Math.floor(Math.random() * 500) + 100, // Random frequency of use
    mostPopularSlots: [
      `Slot ${Math.floor(Math.random() * 20) + 1}`,
      `Slot ${Math.floor(Math.random() * 20) + 1}`,
    ],
  };
  await UsagePatterns.create(usagePatterns);
  console.log("Usage patterns created");

  // Create Revenue Statistics
  const revenueStats = {
    totalRevenue: Math.floor(Math.random() * 10000) + 5000, // Random total revenue between 5000 and 15000
    dailyRevenue: Math.floor(Math.random() * 1000) + 200, // Random daily revenue between 200 and 1200
    weeklyRevenue: Math.floor(Math.random() * 5000) + 1000, // Random weekly revenue between 1000 and 6000
  };
  await RevenueStats.create(revenueStats);
  console.log("Revenue statistics created");

  // Create Alerts
  const alerts = [];
  for (let i = 0; i < 5; i++) {
    alerts.push({
      message: `Alert message ${i + 1}`,
      createdAt: new Date(),
    });
  }
  const insertedAlerts = await Alert.insertMany(alerts);
  console.log(`${insertedAlerts.length} alerts created`);
};

// Run the script
const run = async () => {
  await connectDB();
  await generateData();
  mongoose.connection.close();
};

run().catch((err) => console.error(err));
