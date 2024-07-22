import { v4 as uuidv4 } from 'uuid'; // Ensure you have uuid installed

import type { Knex } from 'knex';

async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('proposals').del();

  // Inserts seed entries
  await knex('proposals').insert([
    {
      id: uuidv4(),
      customer_id: '123',
      customer_name: 'Praveen',
      term: 'monthly',
      status: 'Draft',
    },
  ]);
}

const name = 'proposals';
export { seed, name };
