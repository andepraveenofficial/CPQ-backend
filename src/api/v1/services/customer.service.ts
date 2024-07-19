/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import CustomerRepository from '../repositories/customer.repository';
import { ICustomer } from '../interfaces/customer.interface';

class CustomerService {
  async createCustomer(customerDetails: ICustomer): Promise<string> {
    const existingCustomer = await CustomerRepository.findByCompanyName(
      customerDetails.legal_company_name,
    );

    if (existingCustomer) {
      throw new Error('Customer already exists');
    }

    const customerWithUUID = {
      ...customerDetails,
      id: uuidv4(),
    };

    const newCustomerIds =
      await CustomerRepository.createCustomer(customerWithUUID);
    return newCustomerIds[0];
  }

  async getAllCustomers(): Promise<ICustomer[]> {
    const customers = await CustomerRepository.getAllCustomers();
    return customers;
  }
}

export default new CustomerService();
