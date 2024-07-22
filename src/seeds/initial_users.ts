import type { Knex } from 'knex';

async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email@gmail.com',
      password: 'ffdfr34',
    },
    {
      id: 2,
      firstname: 'firstname1',
      lastname: 'lastname1',
      email: 'email@gmail1.com',
      password: 'ffdfr344',
    },
  ]);
}

const name = 'users';
export { seed, name };
