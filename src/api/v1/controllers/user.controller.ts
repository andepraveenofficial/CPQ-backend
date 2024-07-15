import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { IUser, IEmailAndPassword } from '../interfaces/user.interface';

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
    return res
      .status(500)
      .json({ message: 'An error occurred while creating the user' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const userDetails: IEmailAndPassword = req.body;
  const { email, password } = userDetails;
  const dbUser = await UserModel.findByEmail(email);
  if (dbUser) {
    const dbUserPassword = dbUser.password;
    const isPasswordMatched = await bcrypt.compare(password, dbUserPassword);
    if (isPasswordMatched === true) {
      const payload = {
        email,
      };
      const secretKey = process.env.JWT_SECRET_KEY;

      if (!secretKey) {
        throw Error(
          'Secret key is not defined. Please set the JWT_SECRET environment variable.',
        );
      }
      const options = {
        expiresIn: '1h', // Token expires in 1 hour
      };

      // Generate the Token
      const token = jwt.sign(payload, secretKey, options);
      // console.log(token);
      res.json({
        message: 'Login Success!',
        token,
      });
    } else {
      // console.log('Invalid Password');
      res.status(400).send('Invalid Password');
    }
  } else {
    res.status(400).send('Invalid User');
  }
};
export { createUser, loginUser };
