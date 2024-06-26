import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {

  development: {
    client: "mysql2",
    connection:{
        host: process.env.DB_HOST,
        // port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
      tableName:"knex_migrations",
      directory: "./src/migrations",
      extension:"ts"
    }
  },
};

export default config;
