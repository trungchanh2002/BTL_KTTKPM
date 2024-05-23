const { Router } = require("express");
const router = Router();
const routesController = require("../controllers/routesController");

// http://localhost:3004/api/v1/routes/getAllRoute
router.get("/getAllRoute", routesController.getAllRoutes);
// http://localhost:3004/api/v1/routes/getRouteById/664c48537766b84903d71c38
router.get("/getRouteById/:id", routesController.getRouteById);
// http://localhost:3004/api/v1/routes/addRoute
router.post("/addRoute", routesController.addRoute);
// http://localhost:3004/api/v1/routes/addBusToRoute
router.post("/addBusToRoute", routesController.addBusToRoute);

module.exports = router;
