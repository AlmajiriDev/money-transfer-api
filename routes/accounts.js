import express from 'express';
import { generateWallet, getWalletDetails } from '../controllers/accountController.js';
import { generateWalletValidator } from '../validators/accountValidators.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../validators/authValidators.js';

const router = express.Router();

router.use(authMiddleware); // Protect all account routes

// Route to generate a wallet
router.post('/generate', generateWalletValidator, validate, generateWallet);

// Route to get wallet details
router.get('/details', getWalletDetails);

export default router;
