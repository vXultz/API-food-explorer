exports.up = knex => knex.schema.createTable("type", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users");
  table.text("name");

  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("type");
