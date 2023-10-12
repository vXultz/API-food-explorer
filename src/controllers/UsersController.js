const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require("../database/knex")


const sqliteConnection = require('../database/sqlite')
class UsersController {
  async create(req, res) {
    const { name, email, password, isAdmin } = req.body

    const database = await sqliteConnection()
    const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if (checkUserExist) {
      throw new AppError('This e-mail is already in use')
    }

    const hashedPassword = await hash(password, 8)

    const user_id = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      isAdmin
    })

    return res.status(201).json(user_id)
  }
}

module.exports = UsersController;