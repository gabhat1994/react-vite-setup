import { type Maybe } from '@/apollo/generated/types';
import {
  type NoumContactFragment,
  type SearchableNoumContactFragment,
} from '@/apollo/graphql';

export function mapNoumContactToSearchableNoumContact(
  noumContact: Maybe<NoumContactFragment> | undefined,
): SearchableNoumContactFragment | undefined {
  if (!noumContact) {
    return undefined;
  }

  return {
    ...noumContact,
    __typename: 'SearchableNoumContact',
    user: noumContact.userId,
    fullName: noumContact.displayName,
    email: noumContact.userId.email,
  };
}
