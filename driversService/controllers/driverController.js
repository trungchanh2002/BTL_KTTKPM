const Driver = require("../models/driver");
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    console.log(drivers);
    res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id); // Khởi tạo biến 'driver'
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
    console.log(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addDriver = async (req, res) => {
  const { name, license_number, phone, email, address } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  const driver = new Driver({
    name,
    license_number,
    phone,
    email,
    address,
    created_at,
    updated_at,
  });
  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// deleteDriver
const deleteDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// updateDriver

const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, license_number, phone, email, address } = req.body;
  const updated_at = new Date();
  try {
    const driver = await Driver.findByIdAndUpdate(id, { name, license_number, phone, email, address, updated_at }, { new: true });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  addDriver,
  deleteDriver,
  updateDriver,
};
