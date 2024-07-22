/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import authenticateToken from '../middlewares/auth.middleware';
import proposalService from '../services/proposal.service';

class ProposalController {
  async createProposal(req: Request, res: Response): Promise<void> {
    try {
      // Apply authenticateToken middleware here
      await authenticateToken(req, res, async () => {
        const proposalDetails = req.body;
        const proposalId =
          await proposalService.createProposal(proposalDetails);
        res
          .status(201)
          .json({ message: 'Proposal created successfully', proposalId });
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Proposal already exists'
      ) {
        res.send(400).json({ message: error.message });
      }
      res
        .send(500)
        .json({ message: 'An error occurred while creating the Proposal' });
    }
  }
}

export default new ProposalController();
