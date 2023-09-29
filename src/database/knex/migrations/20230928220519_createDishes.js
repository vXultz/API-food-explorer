exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id')
  table.text('name').notNullable()
  table.text('description').notNullable()
  table.text('category').notNullable()
  table.text('image').notNullable()
  table.integer('price').notNullable()
})

exports.down = knex => knex.schema.dropTable('dishes');
