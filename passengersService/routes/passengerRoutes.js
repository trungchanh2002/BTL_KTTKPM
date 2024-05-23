const { Router } = require("express");
const router = Router();
const passengerController = require("../controllers/passengerController");
const middlewareController = require("../middlewares/middlewareController");

// http://localhost:3001/api/v1/passengers/getAllPassengers
router.get("/getAllPassengers", middlewareController.verifyTokenAuth, passengerController.getAllPassengers);
// http://localhost:3001/api/v1/passengers/getPassengerById/664c48537766b84903d71c38
router.get("/getPassengerById/:id", passengerController.getPassengerById);
// http://localhost:3001/api/v1/passengers/login
router.post("/login", passengerController.login);
// http://localhost:3001/api/v1/passengers/signup
router.post("/signup", passengerController.signup);
// http://localhost:3001/api/v1/passengers/deletePassenger/664c48537766b84903d71c38
router.post("/deletePassenger/:id", passengerController.deletePassenger);
module.exports = router;
