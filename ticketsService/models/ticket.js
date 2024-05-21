const mongoose = require("mongoose");

const ticket = new mongoose.Schema({
  passenger_id: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  bus_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  route_id: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  seat_number: { type: String, required: true },
  price: { type: Number, required: true },
  departure_time: { type: Date, required: true },
  status: { type: String, default: "booked" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("tickets", ticket);

module.exports = Ticket;
