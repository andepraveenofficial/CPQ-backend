import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create table, add columns, modify existing tables, etc.
  await knex.schema.createTable('proposals', (table) => {
    table.uuid('id').primary();
    table.uuid('customer_id').notNullable();
    table.string('customer_name').notNullable();
    table.string('term').notNullable();
    table.enum('status', ['Draft', 'Approved', 'Rejected']).defaultTo('Draft');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Rollback changes
  await knex.schema.dropTable('proposals');
}
