const Ticket = require("../models/ticket");
const Route = require("../models/route");
const Bus = require("../models/bus");
const Passenger = require("../models/passengerModel");

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addTicket = async (req, res) => {
  const { passenger_id, route_id, bus_id, driver_id, seat_number } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  // departure_time = new Date(departure_time) + 2 ngày;
  const departure_time = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
  try {
    const passenger = await Passenger.findById(passenger_id);
    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    // Kiểm tra bus_id có tồn tại trong route hay không
    const route = await Route.findById(route_id);
    // 10km -> 20000đ
    const kc = route.distance;
    const price = (kc * 20000) / 1000;
    const status = "booked";

    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }
    // Giả sử route có một danh sách các bus_id
    const busExistsInRoute = route.buses.includes(bus_id);
    if (!busExistsInRoute) {
      return res.status(400).json({ error: "Bus does not exist in the specified route" });
    }

    // Kiểm tra driver_id có tồn tại trong bus_id hay không
    const bus = await Bus.findById(bus_id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Giả sử bus có một danh sách các driver_id
    const driverExistsInBus = bus.drivers.includes(driver_id);
    if (!driverExistsInBus) {
      return res.status(400).json({ error: "Driver does not exist in the specified bus" });
    }

    // Nếu tất cả các kiểm tra đều thành công, tạo vé
    const ticket = new Ticket({
      passenger_id,
      route_id,
      bus_id,
      driver_id,
      seat_number,
      departure_time,
      price,
      status,
      created_at,
      updated_at,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  addTicket,
};
