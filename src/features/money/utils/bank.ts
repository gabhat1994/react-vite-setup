import {
  MINUTES_TO_SHOW_ACCOUNT_BALANCE,
  MINUTES_TO_WAIT_FOR_ADDING_AGAIN_ACCOUNT,
} from '@/constants/payments';
import { differenceInMinutes } from 'date-fns';
import { BankAccountStatus } from '../types';

export const BankUtil = {
  isPendingVerification: (status?: string | null) =>
    !!status &&
    [
      BankAccountStatus.ADDED,
      BankAccountStatus.MICRO_DEPOSIT_INITIATED,
      BankAccountStatus.MICRO_DEPOSIT_COMPLETE,
    ].includes(status),
  isActive: (status?: string | null) =>
    !!status && [BankAccountStatus.ACTIVE].includes(status),
  isVerificationFailed: (status?: string | null) =>
    !!status &&
    [
      BankAccountStatus.MICRO_DEPOSIT_FAILED,
      BankAccountStatus.MICRO_DEPOSIT_VERIFY_FAIL,
    ].includes(status),
  shouldHideBalance: (createdAt?: string | null, balance?: number | null) =>
    (!!balance &&
      !!createdAt &&
      differenceInMinutes(Date.now(), new Date(Number(createdAt))) >
        MINUTES_TO_SHOW_ACCOUNT_BALANCE) ||
    !balance,
  canUserVerify: (status?: string | null) =>
    !!status && [BankAccountStatus.MICRO_DEPOSIT_COMPLETE].includes(status),
  canUserAddAgain: (createdAt?: string | null) =>
    !!createdAt &&
    differenceInMinutes(Date.now(), new Date(Number(createdAt))) >
      MINUTES_TO_WAIT_FOR_ADDING_AGAIN_ACCOUNT,
};
