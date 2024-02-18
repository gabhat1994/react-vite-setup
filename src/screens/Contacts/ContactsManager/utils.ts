import { type ApolloCache } from '@apollo/client';
import { type NoumContactStatus } from '@/apollo/generated/types';
import {
  type SearchableNoumContactFragment,
  SearchableNoumContactFragmentDoc,
} from '@/apollo/graphql';
import { type Filters, ListPOV } from './types';

const getDefaultFilterValues = (): Filters => ({
  search: '',
  limit: 10,
  perspective: ListPOV.ACTIVE,
});

const updateSearchableNoumContactCacheFragment = ({
  status,
  id,
  cache,
}: {
  cache: ApolloCache<unknown>;
  id: string;
  status: NoumContactStatus;
}) => {
  cache.updateFragment<SearchableNoumContactFragment>(
    {
      fragment: SearchableNoumContactFragmentDoc,
      id: cache.identify({
        __typename: 'SearchableNoumContact',
        _id: id,
      }),
      fragmentName: 'SearchableNoumContact',
    },
    (data) => ({
      ...data,
      __typename: 'SearchableNoumContact',
      _id: data?._id!,
      displayName: data?.displayName!,
      createdAt: data?.createdAt,
      isConnectedWithNoum: data?.isConnectedWithNoum ?? false,
      user: data?.user!,
      status,
    }),
  );
};

export const ContactsManagerUtils = {
  getDefaultFilterValues,
  updateSearchableNoumContactCacheFragment,
};
