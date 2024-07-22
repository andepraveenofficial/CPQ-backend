export interface IProposal {
  id: string;
  customer_id: string;
  customer_name: string;
  term: 'Monthly' | 'Quarterly' | 'Annually';
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
}
