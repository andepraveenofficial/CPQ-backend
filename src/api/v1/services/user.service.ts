/* eslint-disable class-methods-use-this */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import { IUser, IEmailAndPassword } from '../interfaces/user.interface';
import ApiError from '../utils/ApiError';

class UserService {
  async createUser(userDetails: IUser): Promise<number[]> {
    try {
      const existingUser = await UserRepository.findByEmail(userDetails.email);

      if (existingUser) {
        const message = 'User Already Exists';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const newUserIds = await UserRepository.createUser(userDetails);
      return newUserIds;
    } catch (error) {
      console.error('Error because User Already Existed');
      throw error;
    }
  }

  async loginUser(userDetails: IEmailAndPassword): Promise<string> {
    try {
      const { email, password } = userDetails;
      const existingUser = await UserRepository.findByEmail(email);

      if (!existingUser) {
        const message = 'Invalid User';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const isPasswordMatched = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!isPasswordMatched) {
        const message = 'Invalid Password';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const payload = { email };
      const secretKey = process.env.JWT_SECRET_KEY;

      if (!secretKey) {
        const message =
          'Secret key is not defined. Please set the JWT_SECRET environment variable.';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const options = { expiresIn: '1d' };
      return jwt.sign(payload, secretKey, options);
    } catch (error) {
      console.error('Error in Creating a User');
      throw error;
    }
  }
}

export default new UserService();
