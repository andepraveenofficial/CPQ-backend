/* eslint-disable class-methods-use-this */

import bcrypt from 'bcrypt';
import knex from '../../../knexdb';
import { IUser } from '../interfaces/user.interface';

class UserRepository {
  async findByEmail(email: string) {
    const dbUser = await knex('users').where({ email }).first();
    return dbUser;
  }

  async createUser(userDetails: IUser): Promise<number[]> {
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
  }
}

export default new UserRepository();
