const { removeAllListeners } = require('nodemon')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class DishesController {
  async create(req, res) {
    const { name, description, type, price, ingredients } = req.body
    const user_id = req.user.id

    const [dish_id] = await knex('dishes').insert({
      user_id,
      name,
      description,
      type,
      price
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        user_id,
        name
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    res.json(dish_id)
  }

  async update(req, res) {
    const { name, description, price, ingredients, type } = req.body
    const { dish_id } = req.params
    const user_id = req.user.id

    const dish = await knex("dishes").where("id", dish_id).first()
    if (!dish) {
      throw new AppError("Dish not found")
    }

    const dishName = await knex("dishes").where("name", name).first()

    if (dishName && (dish_id) !== dishName.id) {
      throw new AppError("Dish name is already in use")
    }

    if (!name) {
      name = dish.name
    }

    if (!description) {
      description = dish.description
    }

    if (!price) {
      price = dish.price
    }

    if (!type) {
      type = dish.type
    }

    if (ingredients) {
      await knex("ingredients").where("dish_id", dish.id).delete()
    }

    await knex("dishes")
      .where("id", dish_id)
      .update({
        name,
        description,
        price,
        type
      })

    const ingredientsArray = ingredients.map(ingredient => {
      if (ingredient.name) {
        return ingredient.name
      } else {
        return ingredient
      }
    })


    ingredientsArray.map(
      async (ingredient) =>
        await knex("ingredients")
          .insert({
            name: ingredient,
            dish_id: dish.id,
            user_id
          })
    )


    return res.json()
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
    const { search } = req.query;

    const dishes = await knex("dishes")
      .select([
        "dishes.id",
        "dishes.name",
        "dishes.price",
        "dishes.description",
        "dishes.type",
        "dishes.image"
      ])
      .leftJoin("ingredients", "dishes.id", "ingredients.dish_id")
      .where(function () {
        this.where("dishes.name", "like", `%${search}%`)
          .orWhere("ingredients.name", "like", `%${search}%`);
      })
      .groupBy("dishes.id")
      .orderBy("dishes.name");

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