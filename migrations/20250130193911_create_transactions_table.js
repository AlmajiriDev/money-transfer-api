export const up = (knex) => {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE');
    table.enum('type', ['deposit', 'transfer']).notNullable();
    table.decimal('amount', 15, 2).notNullable();
    table.string('recipient_account_number').nullable();
    table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending');
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('transactions');
};
