const Bus = require("../models/bus");
const Driver = require("../models/driver");

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    console.log(buses);
    res.status(200).json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBusById = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findById(id).populate({
      path: "drivers",
      model: Driver, // Sử dụng mô hình "Driver" đã import
      select: "_id name phone address license_number",
    });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addBus = async (req, res) => {
  const { bus_number, capacity, make, model, year } = req.body;
  const driver_id = [];
  const created_at = new Date();
  const updated_at = new Date();

  try {
    const bus = new Bus({
      bus_number,
      capacity,
      make,
      model,
      year,
      drivers: driver_id,
      created_at,
      updated_at,
    });
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//addDriverToBus
const addDriverToBus = async (req, res) => {
  const { bus_id, driver_id } = req.body;
  try {
    const bus = await Bus.findById(bus_id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    const driver = await Driver.findById(driver_id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    bus.drivers.push(driver_id);
    await bus.save();
    res.status(200).json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllBuses,
  getBusById,
  addBus,
  addDriverToBus,
};
