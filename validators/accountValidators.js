import { body } from 'express-validator';

// Validation rules for generating a wallet
export const generateWalletValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('bvn').notEmpty().withMessage('BVN is required'),
  body('nin').notEmpty().withMessage('NIN is required'),
];
