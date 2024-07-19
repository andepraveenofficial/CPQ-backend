/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { IUser, IEmailAndPassword } from '../interfaces/user.interface';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userDetails: IUser = req.body;
      const userId = await UserService.createUser(userDetails);
      res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        res.status(400).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: 'An error occurred while creating the user' });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const userDetails: IEmailAndPassword = req.body;
      const token = await UserService.loginUser(userDetails);
      res.json({ message: 'Login Success!', token });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === 'Invalid User' ||
          error.message === 'Invalid Password'
        ) {
          res.status(400).json({ message: error.message });
        }
      }
      res.status(500).json({ message: 'An error occurred during login' });
    }
  }
}

export default new UserController();
