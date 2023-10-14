const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRouter = require('./dishes.routes')
const dishTypeRouter = require("./dishType.routes");
const ingredientsRouter = require('./ingredients.routes')
const typeRouter = require("./type.routes")
const sessionsRouter = require("./sessions.routes")


const routes = Router()

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRouter)
routes.use("/dishType", dishTypeRouter);
routes.use("/type", typeRouter);
routes.use('/ingredients', ingredientsRouter)
routes.use('/sessions', sessionsRouter)


module.exports = routes