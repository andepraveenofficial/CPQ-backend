import bcrypt from 'bcrypt'; // password hashing
import knex from '../../../knexdb'; // database operations
import { IUser } from '../interfaces/user.interface'; // Interface

const findByEmail = async (email: string) => {
  const dbUser = await knex('users').where({ email }).first();
  return dbUser;
};

const createUser = async (userDetails: IUser): Promise<number[]> => {
  const { firstname, lastname, email, password } = userDetails;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into database
  const newUserIds = await knex('users').insert({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  return newUserIds;
};

export default { createUser, findByEmail };
