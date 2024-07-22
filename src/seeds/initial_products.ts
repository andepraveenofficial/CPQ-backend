import { v4 as uuidv4 } from 'uuid';
import type { Knex } from 'knex';

async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      id: uuidv4(),
      name: 'Product 1',
      internal_name: 'Internal Product 1',
      description: 'Description for product 1',
      charge_method: 'on-time',
      currency: 'USD',
      unit_price: 100,
      status: 'active',
      last_activity: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Product 2',
      internal_name: 'Internal Product 2',
      description: 'Description for product 2',
      charge_method: 'on-time',
      currency: 'USD',
      unit_price: 100,
      status: 'active',
      last_activity: new Date(),
    },
  ]);
}

const name = 'products';
export { seed, name };
