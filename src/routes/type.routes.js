const { Router } = require("express");
const TypeController = require("../controllers/TypeController");
const typeRoutes = Router();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const typeController = new TypeController();

typeRoutes.post("/", ensureAuthenticated, typeController.create);
typeRoutes.get("/", typeController.index);


module.exports = typeRoutes;