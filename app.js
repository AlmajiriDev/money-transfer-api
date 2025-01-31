// app.js
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import accountRoutes from './routes/accounts.js';
import transactionRoutes from './routes/transactions.js';
// import webhookRoutes from './routes/webhooks.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
// app.use('/webhooks', webhookRoutes);

// Error handling middleware
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
  res.send('Money Transfer App is running!');
});

export default app;
