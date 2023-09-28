exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id')
  table.text('name')
  table.text('description')
  table.text('category')
  table.text('image').default(null)
  table.integer('price')
})

exports.down = knex => knex.schema.dropTable('dishes');
