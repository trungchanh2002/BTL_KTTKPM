const { Router } = require("express");
const router = Router();
const busesController = require("../controllers/busesController");

// http://localhost:3002/api/v1/buses/getAllBuses
router.get("/getAllBuses", busesController.getAllBuses);
// http://localhost:3002/api/v1/buses/getBusById/664c48537766b84903d71c38
router.get("/getBusById/:id", busesController.getBusById);
// http://localhost:3002/api/v1/buses/addBus
router.post("/addBus", busesController.addBus);
// http://localhost:3002/api/v1/buses/addDriverToBus
router.post("/addDriverToBus", busesController.addDriverToBus);

module.exports = router;
