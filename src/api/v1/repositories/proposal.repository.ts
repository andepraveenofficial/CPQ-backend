/* eslint-disable class-methods-use-this */

import knex from '../../../knexdb';
import { IProposal } from '../interfaces/proposal.interface';

class ProposalRepository {
  async createProposal(proposalDetails: IProposal): Promise<number[]> {
    // Insert new product into database
    const newProposalIds = await knex('proposals').insert(proposalDetails);
    return newProposalIds;
  }

  async getAllProposals(): Promise<IProposal[]> {
    // Retrieve all proposals from database
    const proposals = await knex('proposals').select('*');
    return proposals;
  }
}

export default new ProposalRepository();
