/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '../interfaces/customer.interface';
import { IProposal } from '../interfaces/proposal.interface';
import CustomerRepository from '../repositories/customer.repository';
import proposalRepository from '../repositories/proposal.repository';

class ProposalService {
  async createProposal(proposalDetails: IProposal) {
    const customerId = proposalDetails.customer_id;
    const existingCustomer: ICustomer | null =
      await CustomerRepository.findByCustomerId(customerId);

    if (!existingCustomer) {
      throw new Error('Customer not  exists');
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
    return proposalId[0];
  }
}

export default new ProposalService();
