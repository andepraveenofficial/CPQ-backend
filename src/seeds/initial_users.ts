import { Knex } from 'knex';

export default async function seed(knex: Knex): Promise<void> {
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
  ]);
}
