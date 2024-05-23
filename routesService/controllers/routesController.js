const Router = require("../models/route");
const Bus = require("../models/bus");
const Driver = require("../models/driver");

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Router.find();
    console.log(routes);
    res.status(200).json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getRouteById = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await Router.findById(id);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addRoute = async (req, res) => {
  const { route_number, start_location, end_location, distance, estimated_time } = req.body;
  const bus_id = [];
  const created_at = new Date();
  const updated_at = new Date();

  try {
    const route = new Router({
      route_number,
      start_location,
      end_location,
      distance,
      estimated_time,
      buses: bus_id,
      created_at,
      updated_at,
    });
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// addBusToRoute
const addBusToRoute = async (req, res) => {
  const { route_id, bus_id } = req.body;
  try {
    const route = await Router.findById(route_id);
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }
    const bus = await Bus.findById(bus_id);
    if (!bus && bus.drivers.length === 0) {
      return res.status(404).json({ error: "Bus not found" });
    }

    route.buses.push(bus_id);
    await route.save();
    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  addRoute,
  addBusToRoute,
};
