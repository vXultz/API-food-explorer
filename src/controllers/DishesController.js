const { removeAllListeners } = require('nodemon')
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

    await knex('ingredients').insert(ingredientsInsert)

    res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients').where({ dish_id: id }).orderBy('name')

    return res.json({
      ...dish,
      ingredients
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('dishes').where({ id }).delete()

    return res.json()
  }

  async index(req, res) {
    const { name, ingredients, category } = req.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.name',
          'dishes.category'
        ])
        .whereLike('dishes.name', `%${name}%`)
        .whereIn('ingredients.name', filterIngredients)
        .innerJoin('dishes', 'dishes.id', "ingredients.dish_id")
        .orderBy('dishes.name')

    } else {
      dishes = await knex('dishes')
        .whereLike('name', `%${name}%`)
        .orderBy('name')
    }

    const allIngredients = await knex('ingredients')

    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = allIngredients.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishIngredients.map(ingredient => ingredient.name)
      }
    })

    return res.json(dishesWithIngredients)
  }
}



module.exports = DishesController