const mongoose = require("mongoose");

const ForexSchema = new mongoose.Schema({
  pair: String,           // USD/NPR
  base: String,           // USD
  quote: String,          // NPR
  rate: Number,           // 132.45
  bid: Number,            // 132.4
  ask: Number,            // 132.5
  timestamp: String,      // 2025-12-10T09:00:00+05:45
  source: String          // sample
}, { collection: "forex" });

module.exports = mongoose.model("Forex", ForexSchema);
