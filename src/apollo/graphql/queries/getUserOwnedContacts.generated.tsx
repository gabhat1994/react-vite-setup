/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumContactFragmentDoc } from '../fragments/noumContact.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserOwnedContactsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.Contactfilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetUserOwnedContactsQuery = { __typename?: 'Query', getUserOwnedContacts: { __typename?: 'NoumContactPaginated', count?: number | null, data?: Array<{ __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null> | null } };


export const GetUserOwnedContactsDocument = gql`
    query getUserOwnedContacts($filter: Contactfilter, $limit: Int, $offset: Int) {
  getUserOwnedContacts(filter: $filter, limit: $limit, offset: $offset) {
    count
    data {
      ...NoumContact
    }
  }
}
    ${NoumContactFragmentDoc}`;

/**
 * __useGetUserOwnedContactsQuery__
 *
 * To run a query within a React component, call `useGetUserOwnedContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOwnedContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOwnedContactsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUserOwnedContactsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserOwnedContactsQuery, GetUserOwnedContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserOwnedContactsQuery, GetUserOwnedContactsQueryVariables>(GetUserOwnedContactsDocument, options);
      }
export function useGetUserOwnedContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserOwnedContactsQuery, GetUserOwnedContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserOwnedContactsQuery, GetUserOwnedContactsQueryVariables>(GetUserOwnedContactsDocument, options);
        }
export type GetUserOwnedContactsQueryHookResult = ReturnType<typeof useGetUserOwnedContactsQuery>;
export type GetUserOwnedContactsLazyQueryHookResult = ReturnType<typeof useGetUserOwnedContactsLazyQuery>;
export type GetUserOwnedContactsQueryResult = Apollo.QueryResult<GetUserOwnedContactsQuery, GetUserOwnedContactsQueryVariables>;