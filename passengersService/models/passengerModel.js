const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;
