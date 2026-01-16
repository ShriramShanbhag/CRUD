/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('chats', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.string('title').notNullable();
    table.string('platform').notNullable();
    table.string('url').notNullable();
    table.timestamps(true, true);

    table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('chats');
};
