/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SearchableNoumContactFragmentDoc } from '../fragments/noumContact.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllNoumsContactsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  query?: Types.InputMaybe<Types.Scalars['String']>;
  status?: Types.InputMaybe<Types.NoumContactStatus>;
}>;


export type AllNoumsContactsQuery = { __typename?: 'Query', allNoumsContacts: { __typename?: 'PaginatedSearchableNoumContact', count: number, data: Array<{ __typename?: 'SearchableNoumContact', _id: string, fullName?: string | null, displayName: string, email?: string | null, title?: string | null, companyName?: string | null, street?: string | null, status: Types.NoumContactStatus, apartmentNo?: string | null, city?: string | null, zipCode?: string | null, state?: string | null, country?: string | null, createdAt: any, isConnectedWithNoum: boolean, user: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } }> } };


export const AllNoumsContactsDocument = gql`
    query allNoumsContacts($limit: Int, $offset: Int, $query: String, $status: NoumContactStatus) {
  allNoumsContacts(
    input: {limit: $limit, offset: $offset, query: $query, status: $status}
  ) {
    count
    data {
      ...SearchableNoumContact
    }
  }
}
    ${SearchableNoumContactFragmentDoc}`;

/**
 * __useAllNoumsContactsQuery__
 *
 * To run a query within a React component, call `useAllNoumsContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllNoumsContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllNoumsContactsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      query: // value for 'query'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAllNoumsContactsQuery(baseOptions?: Apollo.QueryHookOptions<AllNoumsContactsQuery, AllNoumsContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllNoumsContactsQuery, AllNoumsContactsQueryVariables>(AllNoumsContactsDocument, options);
      }
export function useAllNoumsContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllNoumsContactsQuery, AllNoumsContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllNoumsContactsQuery, AllNoumsContactsQueryVariables>(AllNoumsContactsDocument, options);
        }
export type AllNoumsContactsQueryHookResult = ReturnType<typeof useAllNoumsContactsQuery>;
export type AllNoumsContactsLazyQueryHookResult = ReturnType<typeof useAllNoumsContactsLazyQuery>;
export type AllNoumsContactsQueryResult = Apollo.QueryResult<AllNoumsContactsQuery, AllNoumsContactsQueryVariables>;