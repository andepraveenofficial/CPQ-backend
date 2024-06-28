import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      extension: 'js',
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
      extension: 'js',
    },
  },
};

export default config;
