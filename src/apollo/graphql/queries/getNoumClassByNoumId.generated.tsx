/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumClassByNoumIdQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetNoumClassByNoumIdQuery = { __typename?: 'Query', getNoumClassByNoumId?: { __typename?: 'NoumClass', _id: string, name: string, type?: string | null, isDeleted?: boolean | null, programId?: { __typename?: 'NoumProgram', _id: string, isDeleted?: boolean | null } | null } | null };


export const GetNoumClassByNoumIdDocument = gql`
    query getNoumClassByNoumId($noumId: ID!) {
  getNoumClassByNoumId(noumId: $noumId) {
    _id
    name
    type
    isDeleted
    programId {
      _id
      isDeleted
    }
  }
}
    `;

/**
 * __useGetNoumClassByNoumIdQuery__
 *
 * To run a query within a React component, call `useGetNoumClassByNoumIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumClassByNoumIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumClassByNoumIdQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetNoumClassByNoumIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoumClassByNoumIdQuery, GetNoumClassByNoumIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumClassByNoumIdQuery, GetNoumClassByNoumIdQueryVariables>(GetNoumClassByNoumIdDocument, options);
      }
export function useGetNoumClassByNoumIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumClassByNoumIdQuery, GetNoumClassByNoumIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumClassByNoumIdQuery, GetNoumClassByNoumIdQueryVariables>(GetNoumClassByNoumIdDocument, options);
        }
export type GetNoumClassByNoumIdQueryHookResult = ReturnType<typeof useGetNoumClassByNoumIdQuery>;
export type GetNoumClassByNoumIdLazyQueryHookResult = ReturnType<typeof useGetNoumClassByNoumIdLazyQuery>;
export type GetNoumClassByNoumIdQueryResult = Apollo.QueryResult<GetNoumClassByNoumIdQuery, GetNoumClassByNoumIdQueryVariables>;