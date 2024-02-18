/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumReferenceCapacityQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNoumReferenceCapacityQuery = { __typename?: 'Query', getNoumReferenceCapacity: Array<Types.NoumReferenceCapacity> };


export const GetNoumReferenceCapacityDocument = gql`
    query getNoumReferenceCapacity {
  getNoumReferenceCapacity
}
    `;

/**
 * __useGetNoumReferenceCapacityQuery__
 *
 * To run a query within a React component, call `useGetNoumReferenceCapacityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumReferenceCapacityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumReferenceCapacityQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNoumReferenceCapacityQuery(baseOptions?: Apollo.QueryHookOptions<GetNoumReferenceCapacityQuery, GetNoumReferenceCapacityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumReferenceCapacityQuery, GetNoumReferenceCapacityQueryVariables>(GetNoumReferenceCapacityDocument, options);
      }
export function useGetNoumReferenceCapacityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumReferenceCapacityQuery, GetNoumReferenceCapacityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumReferenceCapacityQuery, GetNoumReferenceCapacityQueryVariables>(GetNoumReferenceCapacityDocument, options);
        }
export type GetNoumReferenceCapacityQueryHookResult = ReturnType<typeof useGetNoumReferenceCapacityQuery>;
export type GetNoumReferenceCapacityLazyQueryHookResult = ReturnType<typeof useGetNoumReferenceCapacityLazyQuery>;
export type GetNoumReferenceCapacityQueryResult = Apollo.QueryResult<GetNoumReferenceCapacityQuery, GetNoumReferenceCapacityQueryVariables>;