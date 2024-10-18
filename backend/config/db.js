const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI); // Log the URI
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

module.exports = connectDB;
