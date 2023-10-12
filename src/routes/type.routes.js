const { Router } = require("express");
const TypeController = require("../controllers/TypeController");
const typeRoutes = Router();

const typeController = new TypeController();

typeRoutes.post("/:user_id", typeController.create);
typeRoutes.get("/", typeController.index);


module.exports = typeRoutes;