/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';
import { ICustomer } from '../interfaces/customer.interface';
import authenticateToken from '../middlewares/auth.middleware';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class CustomerController {
  async createCustomer(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const customerDetails: ICustomer = req.body;
        const data = await CustomerService.createCustomer(customerDetails);
        const message = 'Customer Created Successfully';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }

  async getAllCustomers(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const data = await CustomerService.getAllCustomers();
        const message = 'All Customers Successfully Fetched';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }
}

export default new CustomerController();
