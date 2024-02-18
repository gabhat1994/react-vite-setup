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

export type Steps = 'enter-data' | 'success';

export interface IAddFundingSource {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

export interface ISuccess {
  onClose: () => void;
}

export enum AccountType {
  Checking = 'Checking',
  Savings = 'Savings',
}
