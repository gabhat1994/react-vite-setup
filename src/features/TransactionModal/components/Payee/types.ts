import { type CSSProperties } from 'styled-components';
import { type TAccount, type TPayee, type TTransactionDestination } from '../../types';

export interface PayeeProps {
  payee: TTransactionDestination;
  selected?: boolean;
  fetchUpdatedBalance?: boolean;
  customStyles?: CSSProperties;
}

interface SelectedProps {
  selected: boolean;
}

export interface CustomerPayeeProps extends SelectedProps {
  payee: TPayee | TAccount;
}

export interface AccountPayeeProps extends SelectedProps {
  payee: TAccount;
  fetchUpdatedBalance: boolean;
}
