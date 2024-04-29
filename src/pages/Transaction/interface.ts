/* eslint-disable */
export interface Transaction {
  sell_transaction_id: string;
  product_id: string;
  qty: string;
  uom_id: string;
  price: string;
  disc_1: string;
  disc_2: string;
  disc_amount: string;
  total: string;
  cogs: string;

  id: string;
  transaction_date: string;
  customer_name: string;
  is_cancelled: string;
  cancelled_at: string;
  is_printed: string;
  printed_at: string;
  sub_total: string;
  grand_total: string;
  notes: string;
}
