require("dotenv").config();
const Passenger = require("../models/passengerModel");
const redisClient = require("../redis/redisController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const { username, password, role } = req.body;
  try {
    const existingUsername = await Passenger.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newPassenger = new Passenger({
      username,
      password: hashedPassword,
      role,
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
    const passenger = await Passenger.findOne({
      username: username,
    });
    if (!passenger) {
      return res.status(400).json({ error: "Username is incorrect" });
    }
    const validPassword = await bcrypt.compare(password, passenger.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Password is incorrect" });
    }
    if (passenger && validPassword) {
      const accessToken = jwt.sign(
        {
          id: passenger._id,
          username: passenger.username,
          role: passenger.role,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1000s" }
      );
      const maxAge = 86400000; // Thời gian sống là 24 giờ (24 * 60 * 60 * 1000)
      res.cookie("accessToken", accessToken, { maxAge: maxAge });
      const { password, ...info } = passenger._doc;
      res.status(200).json({ ...info, accessToken });
    }
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
