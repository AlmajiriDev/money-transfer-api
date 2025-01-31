import axios from 'axios';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

// Send money using Raven Bank API and notify via webhook
export const sendMoney = async (req, res) => {
  try {
    const { id } = req.user;
    const { recipientAccountNumber, recipientBank, amount } = req.body;

    // Find the sender's account
    const senderAccount = await Account.findByUserId(id);
    if (!senderAccount) {
      return res.status(404).json({ message: 'Sender account not found' });
    }

    // Check if sender has sufficient balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // ✅ Step 1: Resolve the recipient account (Validate it)
    const resolveResponse = await axios.post(
      'https://wallets.getravenbank.com/api/v1/resolve_account',
      { account_number: recipientAccountNumber, bank: recipientBank },
      { headers: { accept: 'application/json', 'content-type': 'application/json' } },
    );

    if (!resolveResponse.data || !resolveResponse.data.account_name) {
      return res.status(400).json({ message: 'Invalid recipient account details' });
    }

    // ✅ Step 2: Proceed with the transfer
    const transferResponse = await axios.post(
      'https://wallets.getravenbank.com/api/v1/transfers',
      {
        sender_wallet: senderAccount.walletReference,
        recipient_account: recipientAccountNumber,
        recipient_bank: recipientBank,
        amount,
        narration: 'Fund transfer',
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.RAVEN_API_KEY}`,
        },
      },
    );

    if (!transferResponse.data.success) {
      return res.status(400).json({ message: 'Transfer failed', details: transferResponse.data });
    }

    // ✅ Step 3: Record the transaction
    const transaction = await Transaction.create({
      accountId: senderAccount.id,
      type: 'transfer',
      amount,
      recipientAccountNumber,
      status: 'completed',
    });

    // ✅ Step 4: Send Webhook Notification
    const webhookUrl = 'https://webhook.site/c953cf04-ebab-45fa-bd93-d9fca7f07862';
    await axios.post(webhookUrl, {
      event: 'TRANSACTION_COMPLETED',
      transactionId: transaction.id,
      sender: senderAccount.walletReference,
      recipient: recipientAccountNumber,
      recipientName: resolveResponse.data.account_name,
      bank: recipientBank,
      amount,
      status: 'completed',
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({
      message: 'Transfer successful',
      transactionId: transaction.id,
      recipient: resolveResponse.data.account_name,
    });
  } catch (error) {
    console.error('Transfer error:', error.response?.data || error.message);
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.response?.data || error.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const { id } = req.user;

    // Find the user's account
    const account = await Account.findByUserId(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Fetch all transactions for the account
    const transactions = await Transaction.findByAccountId(account.id);

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
