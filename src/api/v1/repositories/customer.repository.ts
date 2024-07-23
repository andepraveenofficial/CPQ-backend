/* eslint-disable class-methods-use-this */

import knex from '../../../knexdb';
import { ICustomer } from '../interfaces/customer.interface';

class CustomerRepository {
  async findByCompanyName(
    legalCompanyName: string,
  ): Promise<ICustomer | undefined> {
    const dbCustomer = await knex('customers')
      .where({ legal_company_name: legalCompanyName })
      .first();
    return dbCustomer;
  }

  async createCustomer(customerDetails: ICustomer): Promise<number[]> {
    // Insert new customer into database
    const newCustomerIds = await knex('customers')
      .insert(customerDetails)
      .returning('id');
    return newCustomerIds;
  }

  async getAllCustomers(): Promise<ICustomer[]> {
    // Retrieve all customers from database
    const customers = await knex('customers').select('*');
    return customers;
  }

  async updateCustomerDetails(
    id: string,
    customerDetails: Partial<ICustomer>,
  ): Promise<ICustomer | null> {
    // Update customer details in the database
    await knex('customers').where({ id }).update(customerDetails);

    // Fetch the updated customer
    const updatedCustomer = await knex('customers').where({ id }).first();

    return updatedCustomer || null;
  }

  async deleteCustomer(id: string): Promise<void> {
    // Delete customer from database
    await knex('customers').where({ id }).del();
  }

  async findByCustomerId(id: string): Promise<ICustomer | null> {
    const dbCustomer = await knex('customers').where({ id }).first();
    return dbCustomer;
  }
}

export default new CustomerRepository();
