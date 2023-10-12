exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users");
  table.text("name");
  table.text("description");
  table.text("type");
  table.text("image").default(null);
  table.integer("price");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
