// knexfile.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      extension: 'cjs', // Specify that migration files use .cjs extension
    },
    seeds: {
      directory: './seeds',
    },
  },
  test: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_TEST,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      extension: 'cjs', // Specify that migration files use .cjs extension
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.PRODUCTION_DB_HOST,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD,
      database: process.env.PRODUCTION_DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      extension: 'cjs', // Specify that migration files use .cjs extension
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
