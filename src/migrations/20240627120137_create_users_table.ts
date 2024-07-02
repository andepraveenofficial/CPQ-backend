import { Knex } from 'knex';

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('dev', (table) => {
    table.increments('id').primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
export function down(knex: Knex) {
  return knex.schema.dropTableIfExists('users');
}
