import { type EmailSubscriptionType } from '@/screens/CoreSettings/NotificationsSettings/types';

export type LocalAuthCredential = {
  accessToken: string;
  refreshToken?: string;
  noumId?: number;
  invoiceId?: string;
  contractId?: string;
  sowId?: string;
  unsubscribeFrom?: EmailSubscriptionType;
};

export type AuthData = Pick<
  LocalAuthCredential,
  'noumId' | 'invoiceId' | 'contractId' | 'sowId' | 'unsubscribeFrom'
>;
