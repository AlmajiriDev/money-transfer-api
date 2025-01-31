import db from '../config/db.js';

class Webhook {
  // Create a new webhook entry
  static async create({ payload, status }) {
    const [webhookId] = await db('webhooks').insert({
      payload,
      status,
    });
    return webhookId;
  }

  // Find a webhook by ID
  static async findById(webhookId) {
    return db('webhooks').where({ id: webhookId }).first();
  }

  // Update webhook status
  static async updateStatus(webhookId, status) {
    return db('webhooks').where({ id: webhookId }).update({ status });
  }

  // Delete a webhook
  static async delete(webhookId) {
    return db('webhooks').where({ id: webhookId }).del();
  }
}

export default Webhook;
