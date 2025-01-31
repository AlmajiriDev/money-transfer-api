import db from '../config/db.js'; // Import Knex instance
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid'; // Generate unique emails

beforeAll(async () => {
  console.log('Running test migrations...');
  await db.migrate.rollback(); // Reset DB before testing
  await db.migrate.latest(); // Apply latest migrations
});

afterEach(async () => {
  console.log('Cleaning up test data...');
  await db('users').truncate(); // Resets IDs & clears data
});

afterAll(async () => {
  console.log('Closing DB connection...');
  await db.destroy();
});

describe('User Model', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: `testuser+${uuidv4()}@example.com`, // Unique email per test
      password: 'password123',
    };

    const userId = await User.create(userData);
    expect(userId).toBeDefined();

    const user = await User.findById(userId);
    expect(user).toMatchObject({
      name: userData.name,
      email: userData.email,
      // Don't check password directly
    });
  });

  it('should find a user by email', async () => {
    const userData = {
      name: 'John Doe',
      email: `testuser+${uuidv4()}@example.com`, // Unique email
      password: 'password123',
    };

    await User.create(userData);
    const user = await User.findByEmail(userData.email);

    expect(user).toMatchObject({
      name: userData.name,
      email: userData.email,
      // Don't check password directly
    });
  });
});
