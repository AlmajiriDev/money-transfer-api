import db from '../config/db.js';

class Account {
  // Create a new wallet account
  static async create({ userId, walletReference, balance = 0.0 }) {
    const [accountId] = await db('accounts').insert({
      user_id: userId,
      wallet_reference: walletReference,
      balance,
    });
    return accountId;
  }

  // Find an account by wallet reference
  static async findByWalletReference(walletReference) {
    return db('accounts').where({ wallet_reference: walletReference }).first();
  }

  // Find an account by user ID
  static async findByUserId(userId) {
    return db('accounts').where({ user_id: userId }).first();
  }

  // Update account balance
  static async updateBalance(walletReference, newBalance) {
    return db('accounts')
      .where({ wallet_reference: walletReference })
      .update({ balance: newBalance });
  }

  // Delete an account
  static async delete(accountId) {
    return db('accounts').where({ id: accountId }).del();
  }
}

export default Account;
