/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { IUser, IEmailAndPassword } from '../interfaces/user.interface';

class UserController {
  private UserService = UserService;

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails: IUser = req.body;
      const userId = await this.UserService.createUser(userDetails);
      return res
        .status(201)
        .json({ message: 'User created successfully', userId });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        return res.status(400).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: 'An error occurred while creating the user' });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails: IEmailAndPassword = req.body;
      const token = await this.UserService.loginUser(userDetails);
      return res.json({ message: 'Login Success!', token });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === 'Invalid User' ||
          error.message === 'Invalid Password'
        ) {
          return res.status(400).json({ message: error.message });
        }
      }
      return res
        .status(500)
        .json({ message: 'An error occurred during login' });
    }
  }
}

export default new UserController();
