export interface ICancelPlanModal {
  open: boolean;
  onClose: () => void;
  planId?: number;
}

export type ReasonListType = {
  label: string;
  description: string;
};

export type Steps = 'submit' | 'feedback';
