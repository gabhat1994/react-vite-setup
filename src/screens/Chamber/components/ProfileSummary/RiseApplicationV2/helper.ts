import { type CQStep } from './types';
import { RiseApplicationStepTranslationKey } from './types';

const cqURL =
  // 'http://localhost:4200/';
  process.env.VITE_CQ_URL ?? 'https://noudev-cq-portal.noumenati.com/';

const cqPrinciplesYou = `${cqURL}build-cq-dialog/principles-you`;

export const RISE_CQ_STEPS: CQStep[] = [
  {
    step: RiseApplicationStepTranslationKey.IDENTITY,
    url: `${cqURL}build-cq-dialog/identity-capital`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.NATIVE,
    url: `${cqURL}build-cq-dialog/native-capital`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.FINANCIAL,
    url: `${cqURL}build-cq-dialog/financial-capital`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.BUSINESS,
    url: `${cqURL}build-cq-dialog/business-plan`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.PRINCIPLES_YOU,
    url: cqPrinciplesYou,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.ESSAYS,
    url: null,
    showCheckbox: true,
  },
];

export const RISE_CQ_STEPS_TAB_FIRST_ROW: CQStep[] = [
  {
    step: RiseApplicationStepTranslationKey.IDENTITY,
    url: `${cqURL}build-cq-dialog/identity-capital`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.NATIVE,
    url: `${cqURL}build-cq-dialog/native-capital`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.FINANCIAL,
    url: `${cqURL}build-cq-dialog/financial-capital`,
    showCheckbox: false,
  },
];

export const RISE_CQ_STEPS_TAB_SECOND_ROW: CQStep[] = [
  {
    step: RiseApplicationStepTranslationKey.BUSINESS,
    url: `${cqURL}build-cq-dialog/business-plan`,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.PRINCIPLES_YOU,
    url: cqPrinciplesYou,
    showCheckbox: false,
  },
  {
    step: RiseApplicationStepTranslationKey.ESSAYS,
    url: null,
    showCheckbox: true,
  },
];
