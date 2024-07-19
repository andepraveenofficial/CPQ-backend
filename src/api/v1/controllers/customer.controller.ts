/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';
import { ICustomer } from '../interfaces/customer.interface';
import authenticateToken from '../middlewares/auth.middleware';

class CustomerController {
  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      // Apply authenticateToken middleware here
      await authenticateToken(req, res, async () => {
        const customerDetails: ICustomer = req.body;
        const customerId =
          await CustomerService.createCustomer(customerDetails);
        res.status(201).json({
          message: 'Customer created successfully',
          customerId,
        });
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Customer already exists'
      ) {
        res.status(400).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: 'An error occurred while creating the customer' });
      }
    }
  }

  async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      // Apply authenticateToken middleware here
      await authenticateToken(req, res, async () => {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json(customers);
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while retrieving customers' });
    }
  }
}

export default new CustomerController();
