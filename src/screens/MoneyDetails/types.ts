export interface BalanceType {
  label: string;
  amount: number | null | undefined;
  size?: 'small';
}

export interface BankType {
  id: string;
  name: string;
  lastFour: string;
  refresh: () => void;
  balance: number | null | undefined;
  createdAt: string | null | undefined;
  updatedAt?: string | null;
  status?: string | null;
}
