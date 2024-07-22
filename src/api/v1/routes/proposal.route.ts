import express from 'express';
import proposalController from '../controllers/proposal.controller';

const router = express.Router();

// create a Proposal
router.post('/', proposalController.createProposal);

export default router;
