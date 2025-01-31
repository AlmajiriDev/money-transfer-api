import db from '../config/db.js';

beforeAll(async () => {
  console.log('Setting up test database...');

  // Disable foreign key checks (Only for MySQL)
  await db.raw('SET FOREIGN_KEY_CHECKS = 0').catch(() => {});

  // Truncate all tables with cascading delete (use .del() if not using MySQL)
  await Promise.all([
    db('users').del(),
    db('accounts').del(),
    db('transactions').del(),
    db('webhooks').del(),
  ]);

  // Re-enable foreign key checks (Only for MySQL)
  await db.raw('SET FOREIGN_KEY_CHECKS = 1').catch(() => {});
});

afterAll(async () => {
  console.log('Cleaning up test database...');

  // Ensure DB is clean after tests
  await Promise.all([
    db('users').del(),
    db('accounts').del(),
    db('transactions').del(),
    db('webhooks').del(),
  ]);

  // Close the DB connection
  await db.destroy();
});
