// models/User.js
import db from '../config/db.js';

class User {
  // Create a new user
  static async create({ name, email, password }) {
    const [userId] = await db('users').insert({
      name,
      email,
      password,
    });
    return userId;
  }

  // Find a user by email
  static async findByEmail(email) {
    return db('users').where({ email }).first();
  }

  // Find a user by ID
  static async findById(id) {
    return db('users').where({ id }).first();
  }

  // Update a user's details
  static async update(id, updates) {
    return db('users').where({ id }).update(updates);
  }

  // Delete a user
  static async delete(id) {
    return db('users').where({ id }).del();
  }
}

export default User;
