/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('tags', (table) => {
    table.increments('id').notNullable();
    table.string('name', 100).unique().notNullable();
  })

  await knex.schema.createTable('chat_tags', (table) => {
    table.integer('chat_id').notNullable();
    table.integer('tag_id').notNullable();

    table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
    table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('tags');
    await knex.schema.dropTable('chat_tags');
};
