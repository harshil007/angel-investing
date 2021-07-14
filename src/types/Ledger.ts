export default interface Ledger {
  activity_id: string;
  date: string;
  type: string;
  method?: string;
  amount: number;
  balance: number;
  requester?: {
    type: string;
  };
  source: LedgerParty;
  destination: LedgerParty;
}

export interface LedgerParty {
  id?: string | number | null;
  type: string;
  description: string;
}
