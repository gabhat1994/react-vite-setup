import type * as Types from '@/apollo/generated/types';

export interface FormValus {
  amount: string;
  transactionReason: string;
  settlementPeriod: Types.SettlementPeriodEnum;
}
