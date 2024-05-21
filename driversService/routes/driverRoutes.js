const { Router } = require("express");
const router = Router();
const driverController = require("../controllers/driverController");

// http://localhost:3003/api/v1/drivers/getAllDriver
router.get("/getAllDriver", driverController.getAllDrivers);
// http://localhost:3003/api/v1/drivers/getDriverById/60c72b4f9b1e8a5a2441d7a3
router.get("/getDriverById/:id", driverController.getDriverById);
// http://localhost:3003/api/v1/drivers/addDriver
router.post("/addDriver", driverController.addDriver);
// http://localhost:3003/api/v1/drivers/deleteDriver/60c72b4f9b1e8a5a2441d7a3
router.post("/deleteDriver/:id", driverController.deleteDriver);
// http://localhost:3003/api/v1/drivers/updateDriver/60c72b4f9b1e8a5a2441d7a3
router.put("/updateDriver/:id", driverController.updateDriver);
module.exports = router;
