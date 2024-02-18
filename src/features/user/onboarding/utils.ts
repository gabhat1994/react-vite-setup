import type { UserOutput } from '@/apollo/generated/types';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { last } from 'lodash';

export const hasAnsweredMoreInfo = (
  user: Pick<UserOutput | UserFragment, 'metadata' | 'profile'>,
): boolean => !!last(user?.metadata)?.additionalInfo;
