/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '../interfaces/customer.interface';
import { IProposal } from '../interfaces/proposal.interface';
import CustomerRepository from '../repositories/customer.repository';
import proposalRepository from '../repositories/proposal.repository';
import ApiError from '../utils/ApiError';

class ProposalService {
  async createProposal(proposalDetails: IProposal): Promise<number[]> {
    try {
      const customerId = proposalDetails.customer_id;
      const existingCustomer: ICustomer | null =
        await CustomerRepository.findByCustomerId(customerId);

      if (!existingCustomer) {
        const message = 'Customer Not Exists';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const customerName: string = existingCustomer.legal_company_name;
      const proposal: IProposal = {
        id: uuidv4(),
        customer_id: customerId,
        customer_name: customerName,
        term: proposalDetails.term,
        status: proposalDetails.status,
      };

      const proposalId = await proposalRepository.createProposal(proposal);
      return proposalId;
    } catch (error) {
      console.error('Error because Product Customer Not Existed');
      throw error;
    }
  }
}

export default new ProposalService();
