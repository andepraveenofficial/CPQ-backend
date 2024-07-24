/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import authenticateToken from '../middlewares/auth.middleware';
import ProposalService from '../services/proposal.service';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class ProposalController {
  async createProposal(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const proposalDetails = req.body;
        const data = await ProposalService.createProposal(proposalDetails);
        const message = 'Proposal created successfully';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }

  async getAllProposals(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const data = await ProposalService.getAllProposals();
        const message = 'All Proposals Successfully Fetched';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }
}

export default new ProposalController();
