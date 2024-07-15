import { Knex } from 'knex';

export default async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      id: 1,
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
      id: 2,
      name: 'Product 2',
      internal_name: 'Internal Product 2',
      description: 'Description for product 2',
      charge_method: 'recurring',
      currency: 'USD',
      unit_price: 200,
      status: 'inactive',
      last_activity: new Date(),
    },
    {
      id: 3,
      name: 'Product 3',
      internal_name: 'Internal Product 3',
      description: 'Description for product 3',
      charge_method: 'on-time',
      currency: 'IND',
      unit_price: 150,
      status: 'active',
      last_activity: new Date(),
    },
  ]);
}
