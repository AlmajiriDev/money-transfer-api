import { body } from 'express-validator';

// Validation rules for sending money
export const sendMoneyValidator = [
  body('recipientAccountNumber')
    .notEmpty()
    .withMessage('Recipient account number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Recipient account number must be 10 digits'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
];
