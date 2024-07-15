import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary(); // Primary key with auto increment
    table.string('name', 250); // product_name
    table.string('internal_name', 250);
    table.text('description');
    table.string('charge_method', 250); // on-time | recurring
    table.string('currency', 250); // USD | IND
    table.integer('unit_price');
    table.string('status', 250); // active | inactive
    table.datetime('last_activity'); // last active datetime
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('products');
}
