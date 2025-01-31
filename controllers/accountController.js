import axios from 'axios';
import Account from '../models/Account.js';

// Generate a new wallet using Raven API
export const generateWallet = async (req, res) => {
  try {
    const { id } = req.user;
    const { email, firstName, lastName, phone, bvn, nin } = req.body;

    const options = {
      method: 'POST',
      url: 'https://integrations.getravenbank.com/v1/wallet/create_merchant',
      headers: {
        Authorization: `Bearer ${process.env.RAVEN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        customer_email: email,
        bvn,
        nin,
        fname: firstName,
        lname: lastName,
        phone,
      },
    };

    const response = await axios.request(options);
    const { reference } = response.data; // Wallet reference returned by Raven

    // Store wallet reference in DB (use your existing logic)
    const accountId = await Account.create({ userId: id, walletReference: reference });

    res.status(201).json({ accountId, walletReference: reference });
  } catch (error) {
    console.error('Error creating wallet:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to create wallet' });
  }
};

// Get wallet details using Raven API
export const getWalletDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const account = await Account.findByUserId(id);

    if (!account) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const options = {
      method: 'GET',
      url: `https://wallets.getravenbank.com/api/v1/wallets/${account.wallet_reference}`,
      headers: {
        Authorization: `Bearer ${process.env.RAVEN_API_KEY}`,
        accept: 'application/json',
      },
    };

    const response = await axios.request(options);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching wallet details:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch wallet details' });
  }
};
