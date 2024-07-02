import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

// Create User
const createUser = async (req: Request, res: Response) => {
  try {
    const userDetails: IUser = req.body;
    const dbUser = await UserModel.findByEmail(userDetails.email);

    if (dbUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUserIds = await UserModel.createUser(userDetails);
    return res
      .status(201)
      .json({ message: 'User created successfully', userId: newUserIds[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    return res
      .status(500)
      .json({ message: 'An error occurred while creating the user' });
  }
};

export default createUser;
