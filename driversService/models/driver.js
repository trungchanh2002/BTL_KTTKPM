const mongoose = require("mongoose");

const driver = new mongoose.Schema({
  name: { type: String, required: true },
  license_number: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const drivers = mongoose.model("driver", driver);

module.exports = drivers;
