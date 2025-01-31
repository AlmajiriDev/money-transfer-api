# Money Transfer App

A backend API for a money transfer application that allows users to:
- Sign up and log in.
- Generate unique bank accounts.
- Send money to other bank accounts.
- Receive notifications for bank transfers via webhooks.

---

## Features

- **User Authentication**: Sign up and log in using JWT (JSON Web Tokens).
- **Account Management**: Generate unique bank accounts for users.
- **Transactions**: Send money to other bank accounts and view transaction history.
- **Webhooks**: Handle incoming bank transfer notifications.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **Knex.js**: SQL query builder for MySQL.
- **MySQL**: Database.
- **JWT**: Authentication.
- **Express Validator**: Input validation.
- **Webhook.site**: Testing webhooks.

---

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/money-transfer-app.git
cd money-transfer-app

2. Install Dependencies
npm install


3. Set Up Environment Variables
   DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=money_transfer_dev
DB_NAME_TEST=money_transfer_test
JWT_SECRET=your_jwt_secret

4. Run migration
   npx knex migrate:latest

npm start
