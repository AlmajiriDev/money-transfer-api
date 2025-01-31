export const up = (knex) => {
  return knex.schema.createTable('webhooks', (table) => {
    table.increments('id').primary();
    table.json('payload').notNullable();
    table.string('status').notNullable(); // Status of the webhook (e.g., 'pending', 'processed')
    table.string('event_type').nullable(); // Event type triggering the webhook
    table.integer('retry_count').defaultTo(0); // Retry count for failed webhooks
    table.timestamp('last_attempted_at').nullable(); // Timestamp of the last attempt
    table.string('response_status').nullable(); // HTTP status code returned from the endpoint
    table.json('response_body').nullable(); // Response body from the receiving endpoint
    table.string('error_message').nullable(); // Error message if the webhook fails
    table.boolean('attempted').defaultTo(false); // Whether the webhook has been attempted
    table.timestamps(true, true); // Created at and updated at timestamps
  });
};

export const down = (knex) => {
  return knex.schema.dropTable('webhooks');
};
