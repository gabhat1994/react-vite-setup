/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetContactConnectionWithNoumQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  contactId: Types.Scalars['ID'];
}>;


export type GetContactConnectionWithNoumQuery = { __typename?: 'Query', getContactConnectionWithNoum?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null } | null };


export const GetContactConnectionWithNoumDocument = gql`
    query getContactConnectionWithNoum($noumId: ID!, $contactId: ID!) {
  getContactConnectionWithNoum(noumId: $noumId, contactId: $contactId) {
    _id
    status
  }
}
    `;

/**
 * __useGetContactConnectionWithNoumQuery__
 *
 * To run a query within a React component, call `useGetContactConnectionWithNoumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactConnectionWithNoumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactConnectionWithNoumQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useGetContactConnectionWithNoumQuery(baseOptions: Apollo.QueryHookOptions<GetContactConnectionWithNoumQuery, GetContactConnectionWithNoumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactConnectionWithNoumQuery, GetContactConnectionWithNoumQueryVariables>(GetContactConnectionWithNoumDocument, options);
      }
export function useGetContactConnectionWithNoumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactConnectionWithNoumQuery, GetContactConnectionWithNoumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactConnectionWithNoumQuery, GetContactConnectionWithNoumQueryVariables>(GetContactConnectionWithNoumDocument, options);
        }
export type GetContactConnectionWithNoumQueryHookResult = ReturnType<typeof useGetContactConnectionWithNoumQuery>;
export type GetContactConnectionWithNoumLazyQueryHookResult = ReturnType<typeof useGetContactConnectionWithNoumLazyQuery>;
export type GetContactConnectionWithNoumQueryResult = Apollo.QueryResult<GetContactConnectionWithNoumQuery, GetContactConnectionWithNoumQueryVariables>;