/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { IUser, IEmailAndPassword } from '../interfaces/user.interface';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userDetails: IUser = req.body;
      const data = await UserService.createUser(userDetails);
      const message = 'User Created Successfully';
      ApiResponseHandler.handleResponse(res, data, message);
    } catch (error) {
      ApiResponseHandler.handleError(res, error);
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
    }
  }
}

export default new UserController();
