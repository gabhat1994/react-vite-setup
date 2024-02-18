/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumLinkedNoumsQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetNoumLinkedNoumsQuery = { __typename?: 'Query', getNoumLinkedNoums?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null> | null } | null };


export const GetNoumLinkedNoumsDocument = gql`
    query getNoumLinkedNoums($noumId: ID!, $limit: Int, $offset: Int) {
  getNoumLinkedNoums(noumId: $noumId, limit: $limit, offset: $offset) {
    data {
      _id
      name
      title
      profileImage
      category {
        _id
        name
      }
    }
    count
  }
}
    `;

/**
 * __useGetNoumLinkedNoumsQuery__
 *
 * To run a query within a React component, call `useGetNoumLinkedNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumLinkedNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumLinkedNoumsQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetNoumLinkedNoumsQuery(baseOptions: Apollo.QueryHookOptions<GetNoumLinkedNoumsQuery, GetNoumLinkedNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumLinkedNoumsQuery, GetNoumLinkedNoumsQueryVariables>(GetNoumLinkedNoumsDocument, options);
      }
export function useGetNoumLinkedNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumLinkedNoumsQuery, GetNoumLinkedNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumLinkedNoumsQuery, GetNoumLinkedNoumsQueryVariables>(GetNoumLinkedNoumsDocument, options);
        }
export type GetNoumLinkedNoumsQueryHookResult = ReturnType<typeof useGetNoumLinkedNoumsQuery>;
export type GetNoumLinkedNoumsLazyQueryHookResult = ReturnType<typeof useGetNoumLinkedNoumsLazyQuery>;
export type GetNoumLinkedNoumsQueryResult = Apollo.QueryResult<GetNoumLinkedNoumsQuery, GetNoumLinkedNoumsQueryVariables>;