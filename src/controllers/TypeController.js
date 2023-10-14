const knex = require("../database/knex")

class TypeController {
  async create(req, res) {
    const user_id = req.user.id

    const { name } = req.body

    await knex("type").insert({ name, user_id })

    return res.json()
  }

  async index(req, res) {
    const type = await knex("type")

    return res.json(type)
  }
}

module.exports = TypeController