const mongoose = require("mongoose");

const usagePatternsSchema = new mongoose.Schema({
  averageDuration: { type: Number, required: true },
  mostPopularSlots: [{ type: String, required: true }],
});

// Avoid OverwriteModelError
const UsagePatterns =
  mongoose.models.UsagePatterns ||
  mongoose.model("UsagePatterns", usagePatternsSchema);

module.exports = UsagePatterns;
