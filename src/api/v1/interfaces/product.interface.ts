export interface IProduct {
  id: number;
  uuid: string;
  name: string;
  internal_name: string;
  description: string;
  charge_method: 'on-time' | 'recurring';
  currency: 'USD' | 'IND';
  unit_price: number;
  status: 'active' | 'inactive';
  last_activity: string; // Use string if you are storing ISO date strings
}
