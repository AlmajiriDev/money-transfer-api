import db from '../config/db.js';

class Transaction {
  // Create a new transaction
  static async create({ accountId, type, amount, recipientAccountNumber, status = 'pending' }) {
    const [transactionId] = await db('transactions').insert({
      account_id: accountId,
      type,
      amount,
      recipient_account_number: recipientAccountNumber,
      status,
    });
    return transactionId;
  }

  // Find all transactions for an account
  static async findByAccountId(accountId) {
    return db('transactions').where({ account_id: accountId });
  }

  // Update transaction status
  static async updateStatus(transactionId, status) {
    return db('transactions').where({ id: transactionId }).update({ status });
  }

  // Delete a transaction
  static async delete(transactionId) {
    return db('transactions').where({ id: transactionId }).del();
  }
}

export default Transaction;
