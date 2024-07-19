/* eslint-disable class-methods-use-this */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import { IUser, IEmailAndPassword } from '../interfaces/user.interface';

class UserService {
  async createUser(userDetails: IUser): Promise<number> {
    const dbUser = await UserRepository.findByEmail(userDetails.email);

    if (dbUser) {
      throw new Error('User already exists');
    }

    const newUserIds = await UserRepository.createUser(userDetails);
    return newUserIds[0];
  }

  async loginUser(userDetails: IEmailAndPassword): Promise<string> {
    const { email, password } = userDetails;
    const dbUser = await UserRepository.findByEmail(email);

    if (!dbUser) {
      throw new Error('Invalid User');
    }

    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordMatched) {
      throw new Error('Invalid Password');
    }

    const payload = { email };
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error(
        'Secret key is not defined. Please set the JWT_SECRET environment variable.',
      );
    }

    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
  }
}

export default new UserService();
