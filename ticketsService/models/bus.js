const mongoose = require("mongoose");

const bus = new mongoose.Schema({
  bus_number: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Buses = mongoose.model("buses", bus);

module.exports = Buses;
