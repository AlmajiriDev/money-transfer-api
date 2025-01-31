import express from 'express';
import { sendMoney, getTransactionHistory } from '../controllers/transactionController.js';
import { sendMoneyValidator } from '../validators/transactionValidators.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../validators/authValidators.js';

const router = express.Router();

router.use(authMiddleware); // Protect all transaction routes

router.post('/send', sendMoneyValidator, validate, sendMoney);
router.get('/history', getTransactionHistory);

// Webhook endpoint for receiving transaction status updates
router.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.status(200).json({ message: 'Webhook received successfully' });
});

export default router;
