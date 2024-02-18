/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumReferencesQueryVariables = Types.Exact<{
  experienceId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  status?: Types.InputMaybe<Array<Types.InputMaybe<Types.NoumReferenceStatus>> | Types.InputMaybe<Types.NoumReferenceStatus>>;
}>;


export type GetNoumReferencesQuery = { __typename?: 'Query', getNoumReferences?: { __typename?: 'NoumReferenceResponse', count?: number | null, data?: Array<{ __typename?: 'NoumReference', _id: string, capacity: Types.NoumReferenceCapacity, experienceId: string, imageUrl?: string | null, providerName: string, referenceText?: string | null, status: Types.NoumReferenceStatus } | null> | null } | null };


export const GetNoumReferencesDocument = gql`
    query getNoumReferences($experienceId: ID!, $limit: Int, $offset: Int, $status: [NoumReferenceStatus]) {
  getNoumReferences(
    experienceId: $experienceId
    limit: $limit
    offset: $offset
    status: $status
  ) {
    count
    data {
      _id
      capacity
      experienceId
      imageUrl
      providerName
      referenceText
      status
    }
  }
}
    `;

/**
 * __useGetNoumReferencesQuery__
 *
 * To run a query within a React component, call `useGetNoumReferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumReferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumReferencesQuery({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetNoumReferencesQuery(baseOptions: Apollo.QueryHookOptions<GetNoumReferencesQuery, GetNoumReferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumReferencesQuery, GetNoumReferencesQueryVariables>(GetNoumReferencesDocument, options);
      }
export function useGetNoumReferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumReferencesQuery, GetNoumReferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumReferencesQuery, GetNoumReferencesQueryVariables>(GetNoumReferencesDocument, options);
        }
export type GetNoumReferencesQueryHookResult = ReturnType<typeof useGetNoumReferencesQuery>;
export type GetNoumReferencesLazyQueryHookResult = ReturnType<typeof useGetNoumReferencesLazyQuery>;
export type GetNoumReferencesQueryResult = Apollo.QueryResult<GetNoumReferencesQuery, GetNoumReferencesQueryVariables>;