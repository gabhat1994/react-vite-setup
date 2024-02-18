import { type Maybe } from '@/apollo/generated/types';
import { type Dispatch, type SetStateAction } from 'react';
import { type RISE_FORM_KEYS } from '../../RightPanel/elements/RiseApplication/types';

export interface IRiseApplicationStatus {
  status?: string | null;
  isOwner: boolean;
}

export enum RiseApplicationStepTranslationKey {
  IDENTITY = 'noumena.rise.identity.step',
  NATIVE = 'noumena.rise.native.step',
  FINANCIAL = 'noumena.rise.finance.step',
  BUSINESS = 'noumena.rise.business.step',
  PRINCIPLES_YOU = 'noumena.rise.priciplesyou.step',
  ESSAYS = 'noumena.rise.essay.step',
}

export type CQStep = {
  step: RiseApplicationStepTranslationKey;
  url: string | null;
  showCheckbox: boolean;
};

export interface IRiseApplicationStep {
  step: RiseApplicationStepTranslationKey;
  noumId: Maybe<string> | undefined;
  refreshApplication: () => void;
  identityStepCompleted: boolean;
  noOfEssays: number;
  canEdit: boolean;
  isClassDeleted: boolean;
  essayQuestionAnswered: boolean;
  url: string | null;
  stepCompleted: boolean;
  showCheckbox: boolean;
  applicationId?: string;
  checked: boolean;
  onCheckBoxClicked: Dispatch<
    SetStateAction<{
      principlesYou: boolean;
      essays: boolean;
    }>
  >;
}

type ResultJsonValue = string | null | undefined;

export type TResultJson = {
  [RISE_FORM_KEYS.IDENTITY_STATUS]: ResultJsonValue;
  [RISE_FORM_KEYS.NATIVE_STATUS]: ResultJsonValue;
  [RISE_FORM_KEYS.BUSINESS_PLAN_STATUS]: ResultJsonValue;
  [RISE_FORM_KEYS.BUSINESS_FINANCIAL_PROJECTIONS_STATUS]: ResultJsonValue;
  [RISE_FORM_KEYS.FINANCIAL_CREDIT_STATUS]: ResultJsonValue;
  [RISE_FORM_KEYS.FINANCIAL_CASHFLOW_STATUS]: ResultJsonValue;
  [RISE_FORM_KEYS.PRINCIPLES_YOU_STATUS]: ResultJsonValue;
};
