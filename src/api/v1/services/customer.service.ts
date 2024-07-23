/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import CustomerRepository from '../repositories/customer.repository';
import { ICustomer } from '../interfaces/customer.interface';
import ApiError from '../utils/ApiError';

class CustomerService {
  async createCustomer(customerDetails: ICustomer): Promise<number[]> {
    try {
      const existingCustomer = await CustomerRepository.findByCompanyName(
        customerDetails.legal_company_name,
      );

      if (existingCustomer) {
        const message = 'Customer Already Exists';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const customerWithUUID = {
        ...customerDetails,
        id: uuidv4(),
      };

      const newCustomerIds =
        await CustomerRepository.createCustomer(customerWithUUID);
      return newCustomerIds;
    } catch (error) {
      console.error('Error because Customer Already Existed');
      throw error;
    }
  }

  async getAllCustomers(): Promise<ICustomer[]> {
    try {
      const customers = await CustomerRepository.getAllCustomers();
      return customers;
    } catch (error) {
      console.error('Error in Get All Customers');
      throw error;
    }
  }
}

export default new CustomerService();
