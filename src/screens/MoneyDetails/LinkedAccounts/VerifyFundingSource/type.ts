export type TVerifyFundingSourceForm = {
  amount1: string;
  amount2: string;
};

export interface FormProps {
  onCloseModal: () => void;
  verifyFundingSource: (bankAccountId: string, refresh?: () => void) => void;
  bankAccountId: string;
  handleRefresh: () => void;
  failureCount: number;
  loading: boolean;
}

export interface IVerifyFundingSource {
  open: boolean;
  onClose: () => void;
  bankAccountId: string;
  refresh: () => void;
}

export type Steps = 'verify-account' | 'failure';

export interface IFailure {
  onClose: () => void;
}
