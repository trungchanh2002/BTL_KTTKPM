const Passenger = require("../models/passengerModel");

const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
    console.log(passengers);
    res.status(200).json(passengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getPassengerById = async (req, res) => {
  const { id } = req.params;
  try {
    const passenger = await Passenger.findById(id);
    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    res.status(200).json(passenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const passenger = await Passenger.findOne({ username, password });
    if (!passenger) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    res.status(200).json(["Login successful", passenger]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllPassengers,
  getPassengerById,
  login,
};
