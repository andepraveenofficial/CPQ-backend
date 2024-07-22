// initial_customers.js
import { v4 as uuidv4 } from 'uuid'; // Ensure you have uuid installed
import type { Knex } from 'knex';

async function seed(knex: Knex) {
  // Deletes ALL existing entries
  await knex('customers').del();

  // Inserts seed entries
  await knex('customers').insert([
    {
      id: uuidv4(),
      legal_company_name: 'Company A',
      default_currency: 'USD',
      address: '123 Street',
      unit_floor: '1',
      city: 'City A',
      state: 'State A',
      postal_code: '12345',
      country: 'Country A',
    },
    {
      id: uuidv4(),
      legal_company_name: 'Company B',
      default_currency: 'EUR',
      address: '456 Avenue',
      unit_floor: '2',
      city: 'City B',
      state: 'State B',
      postal_code: '67890',
      country: 'Country B',
    },
  ]);
}

const name = 'customers';
export { seed, name };
