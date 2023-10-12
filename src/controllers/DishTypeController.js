const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class DishTypeController {
  async index(req, res) {
    const { type } = req.query;

    const dishes = await knex("dishes")
      .whereLike("type", `%${type}%`)
      .orderBy("name");

    return res.json(dishes)
  }
}

module.exports = DishTypeController