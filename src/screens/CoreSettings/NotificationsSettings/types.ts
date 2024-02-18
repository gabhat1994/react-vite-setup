import { type SubscriptionTypes } from '@/apollo/generated/types';

export type EmailSubscriptionType = keyof Omit<SubscriptionTypes, '__typename'>;
