const { Router } = require("express");
const router = Router();
const passengerController = require("../controllers/passengerController");

// http://localhost:3001/api/v1/passengers/getAllPassengers
router.get("/getAllPassengers", passengerController.getAllPassengers);
// http://localhost:3001/api/v1/passengers/getPassengerById/664c48537766b84903d71c38
router.get("/getPassengerById/:id", passengerController.getPassengerById);

module.exports = router;
