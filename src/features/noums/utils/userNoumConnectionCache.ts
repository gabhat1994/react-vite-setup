import {
  NoumUserConnectionStateFragmentDoc,
  type GetNoumUserConnectionStateQueryVariables,
  type NoumUserConnectionStateFragment,
} from '@/apollo/graphql';
import { type ApolloCache } from '@apollo/client';

interface UpdateUserNoumConnectionFragmentOptions {
  cache: ApolloCache<unknown>;
  noumId: string;
  data: NoumUserConnectionStateFragment;
}

const defaultConnectionState: NoumUserConnectionStateFragment = {
  __typename: 'SpaceOutput',
  isConnected: false,
  isFollowing: false,
  membershipStatus: null,
  connectionId: null,
  connectionRole: null,
  connectionWithNoum: null,
};

export function updateUserNoumConnectionFragment({
  cache,
  noumId,
  data,
}: UpdateUserNoumConnectionFragmentOptions) {
  const existingFragment = cache.readFragment<
    NoumUserConnectionStateFragment,
    GetNoumUserConnectionStateQueryVariables
  >({
    fragment: NoumUserConnectionStateFragmentDoc,
    fragmentName: 'NoumUserConnectionState',
    id: cache.identify({
      __typename: 'SpaceOutput',
      _id: noumId,
    }),
  });

  cache.writeFragment<
    NoumUserConnectionStateFragment,
    GetNoumUserConnectionStateQueryVariables
  >({
    fragment: NoumUserConnectionStateFragmentDoc,
    fragmentName: 'NoumUserConnectionState',
    id: cache.identify({
      __typename: 'SpaceOutput',
      _id: noumId,
    }),
    data: {
      ...defaultConnectionState,
      ...existingFragment,
      ...data,
    },
  });
}
