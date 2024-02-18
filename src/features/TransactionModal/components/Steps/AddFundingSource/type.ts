export type TAddFundingSourceForm = {
  accountType: AccountType;
  accountName: string;
  routingNumber: string;
  accountNumber: string;
  reAccountNumber: string;
};

export interface FormProps {
  onCloseModal?: () => void;
  addFundingSource: () => void;
  loading: boolean;
}

export enum AccountType {
  Checking = 'Checking',
  Savings = 'Savings',
}
