export const up = (knex) => {
  return knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('wallet_reference').unique().nullable(); // Store Raven Bank wallet reference
    table.decimal('balance', 15, 2).defaultTo(0.0);
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('accounts');
};
