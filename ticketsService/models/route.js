const mongoose = require("mongoose");

const route = new mongoose.Schema({
  route_number: { type: String, required: true },
  start_location: { type: String, required: true },
  end_location: { type: String, required: true },
  distance: { type: Number, required: true },
  estimated_time: { type: Number, required: true },
  buses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bus" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Route = mongoose.model("routes", route);

module.exports = Route;
