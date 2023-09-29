const knex = require('../database/knex')

class DishesController {
  async create(req, res) {
    const { name, description, category, image, price, ingredients } = req.body

    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      category,
      image,
      price
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    })

    await knex('ingredients').insert({ ingredientsInsert })

    res.json()
  }

}



module.exports = DishesController