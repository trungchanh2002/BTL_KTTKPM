const Passenger = require("../models/passengerModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
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
const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUsername = await Passenger.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newPassenger = new Passenger({
      username,
      password: hashedPassword,
      name: "Chanh",
      email: "Chanh",
    });
    await newPassenger.save();
    res.status(201).json(["Sign Up successful", newPassenger]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Retrieve the user with the provided username
    const passenger = await Passenger.findOne({ username });
    // If no user found, or if the passwords don't match, return invalid credentials
    if (!passenger || !(await bcrypt.compare(password, passenger.password))) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    // If the passwords match, login is successful
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
  signup,
};
