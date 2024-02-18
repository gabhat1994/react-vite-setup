import { type ReactNode } from 'react';

type Action = {
  onDownload: () => void;
  onReject: () => void;
  onAcceptAndPay: () => void;
  onDelete: () => void;
  onSubmitRequest: () => void;
  onDuplicate: () => void;
  submitDisabled: boolean;
  deleteDisabled: boolean;
  isTablet: boolean;
  isMobile: boolean;
  loading: boolean;
  hideDelete: boolean;
  hideButtons: boolean;
  disableButtons: boolean;
};

export type HeaderProps = {
  isMobile: boolean;
  isTablet: boolean;
  rightAction?: ReactNode;
  heading: string;
  stepper?: boolean;
  unsetMinWidth?: boolean;
  wrap?: boolean;
  currentStep: number;
  totalSteps: number;
  label?: ReactNode;
  onBack?: () => void;
};

export type Delete = Pick<Action, 'deleteDisabled'> &
  Required<Pick<Action, 'onDelete' | 'isMobile' | 'isTablet'>>;

export type Download = Required<Pick<Action, 'onDownload'>>;
export type AcceptAndPay = Required<
  Pick<Action, 'onAcceptAndPay' | 'disableButtons'>
>;
export type Reject = Required<Pick<Action, 'onReject' | 'disableButtons'>>;
export type Duplicate = Required<Pick<Action, 'onDuplicate'>>;
export type SubmitRequest = Required<
  Pick<
    Action,
    'onSubmitRequest' | 'submitDisabled' | 'isMobile' | 'isTablet' | 'loading'
  >
>;

export type OfferAction = {
  hideRejectButton: boolean;
  hideAcceptAndPay: boolean;
} & Download &
  AcceptAndPay &
  Reject;

export type SummaryAction = Pick<Action, 'hideDelete'> & Delete & Duplicate;
export type FormAction = Delete & SubmitRequest;
