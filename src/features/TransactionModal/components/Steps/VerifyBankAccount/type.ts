export type TVerifyFundingSourceForm = {
  amount1: string;
  amount2: string;
};

export interface FormProps {
  verifyFundingSource: (
    bankAccountId: string | null,
    refresh?: () => void,
  ) => void;
  bankAccountId: string | null;
  refresh: () => void;
  failureCount: number;
  loading: boolean;
}

export interface IFailure {
  onClose: () => void;
}
