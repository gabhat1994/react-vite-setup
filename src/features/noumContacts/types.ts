import { type UserStatus } from '@/apollo/generated/types';
import { type SearchableNoumContactFragment } from '@/apollo/graphql';

export type SearchableNoumContact = SearchableNoumContactFragment & {
  isCurrentUser?: boolean;
};

export type SelectedContact = {
  email?: string;
  name: string;
  country?: string;
  city?: string;
  state?: string;
  street?: string;
  apartmentNo?: string;
  zipCode?: string;
  title?: string;
  userStatus: UserStatus | undefined;
  isConnectedWithNoum: boolean;
};
