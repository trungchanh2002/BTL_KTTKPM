const Passenger = require("../models/passengerModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const redisClient = require("../redis/redisController");

const getAllPassengers = async (req, res) => {
  try {
    // Kiểm tra dữ liệu trong Redis
    const cachedPassengers = await redisClient.get("passengers");
    if (cachedPassengers) {
      console.log("Đã lấy dữ liệu từ Redis");
      return res.status(200).json(JSON.parse(cachedPassengers));
    }
    // Nếu không có trong Redis, lấy dữ liệu từ database
    const passengers = await Passenger.find();
    // Lưu dữ liệu vào Redis với thời gian hết hạn (tuỳ chọn, ở đây là 1 giờ)
    await redisClient.set("passengers", JSON.stringify(passengers), "EX", 3600);
    // Trả về dữ liệu từ database
    res.status(200).json(passengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getPassengerById = async (req, res) => {
  const { id } = req.params;
  try {
    // Kiểm tra dữ liệu trong Redis trước khi truy vấn database
    const cachedPassenger = await redisClient.get(`passenger_${id}`);
    if (cachedPassenger) {
      console.log("Đã lấy dữ liệu từ Redis");
      return res.status(200).json(JSON.parse(cachedPassenger));
    }
    // Nếu không có trong Redis, lấy dữ liệu từ database
    const passenger = await Passenger.findById(id);
    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    // Lưu dữ liệu của passenger vào Redis với thời gian hết hạn
    await redisClient.set(`passenger_${id}`, JSON.stringify(passenger), "EX", 3600);
    // Trả về dữ liệu từ database
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
      name: "name",
      email: "email",
      phone: "phone",
      address: "address",
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

const deletePassenger = async (req, res) => {
  const { id } = req.params;
  try {
    const passenger = await Passenger.findById(id);
    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    await passenger.deleteOne();
    res.status(200).json({ message: "Passenger deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllPassengers,
  getPassengerById,
  deletePassenger,
  login,
  signup,
};
