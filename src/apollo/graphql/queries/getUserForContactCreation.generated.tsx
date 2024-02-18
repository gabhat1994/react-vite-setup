/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserAddressFragmentDoc } from '../fragments/user.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserForContactCreationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetUserForContactCreationQuery = { __typename?: 'Query', user?: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null, userAddress?: { __typename?: 'AddressOutput', street?: string | null, apartment?: string | null, city?: string | null, zipcode?: string | null, state?: string | null } | null } | null };


export const GetUserForContactCreationDocument = gql`
    query GetUserForContactCreation($id: ID!) {
  user(_id: $id) {
    _id
    userStatus
    firstName
    lastName
    email
    title
    location
    profile {
      _id
      profilePictureThumbnail
    }
    userAddress {
      ...UserAddress
    }
  }
}
    ${UserAddressFragmentDoc}`;

/**
 * __useGetUserForContactCreationQuery__
 *
 * To run a query within a React component, call `useGetUserForContactCreationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserForContactCreationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserForContactCreationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserForContactCreationQuery(baseOptions: Apollo.QueryHookOptions<GetUserForContactCreationQuery, GetUserForContactCreationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserForContactCreationQuery, GetUserForContactCreationQueryVariables>(GetUserForContactCreationDocument, options);
      }
export function useGetUserForContactCreationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserForContactCreationQuery, GetUserForContactCreationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserForContactCreationQuery, GetUserForContactCreationQueryVariables>(GetUserForContactCreationDocument, options);
        }
export type GetUserForContactCreationQueryHookResult = ReturnType<typeof useGetUserForContactCreationQuery>;
export type GetUserForContactCreationLazyQueryHookResult = ReturnType<typeof useGetUserForContactCreationLazyQuery>;
export type GetUserForContactCreationQueryResult = Apollo.QueryResult<GetUserForContactCreationQuery, GetUserForContactCreationQueryVariables>;