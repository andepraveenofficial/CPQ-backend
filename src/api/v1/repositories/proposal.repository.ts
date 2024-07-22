/* eslint-disable class-methods-use-this */

import knex from '../../../knexdb';
import { IProposal } from '../interfaces/proposal.interface';

class ProposalRepository {
  async createProposal(proposalDetails: IProposal): Promise<number[]> {
    // Insert new product into database
    const newProposalIds = await knex('proposals').insert(proposalDetails);
    return newProposalIds;
  }
}

export default new ProposalRepository();
