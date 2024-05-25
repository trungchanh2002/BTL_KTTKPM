const { Router } = require("express");
const router = Router();
const ticketController = require("../controllers/ticketController");

// http://localhost:3005/api/v1/tickets/getAllTickets
router.get("/getAllTickets", ticketController.getAllTickets);
// http://localhost:3005/api/v1/tickets/getPassengerById/664c48537766b84903d71c38
router.get("/getTicketById/:id", ticketController.getTicketById);
// http://localhost:3005/api/v1/tickets/addTicket
router.post("/addTicket", ticketController.addTicket);

module.exports = router;
