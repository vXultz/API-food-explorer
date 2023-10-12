const { Router } = require("express");
const DishTypeController = require("../controllers/DishTypeController");
const dishTypeRoutes = Router();


const dishTypeController = new DishTypeController();

dishTypeRoutes.get("/", dishTypeController.index);


module.exports = dishTypeRoutes;