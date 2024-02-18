/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumProgramresultByIdQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetNoumProgramresultByIdQuery = { __typename?: 'Query', getNoumProgramresultById?: { __typename?: 'ApplicationResult', _id: string, status?: Types.ApplicationResultStatusAdmin | null, score?: number | null, resultJSON?: any | null, questions?: Array<any | null> | null, parentNoumId?: { __typename?: 'SpaceOutput', _id?: string | null } | null } | null };


export const GetNoumProgramresultByIdDocument = gql`
    query getNoumProgramresultById($noumId: ID!) {
  getNoumProgramresultById(noumId: $noumId) {
    _id
    status
    score
    resultJSON
    questions
    parentNoumId {
      _id
    }
  }
}
    `;

/**
 * __useGetNoumProgramresultByIdQuery__
 *
 * To run a query within a React component, call `useGetNoumProgramresultByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumProgramresultByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumProgramresultByIdQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetNoumProgramresultByIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoumProgramresultByIdQuery, GetNoumProgramresultByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumProgramresultByIdQuery, GetNoumProgramresultByIdQueryVariables>(GetNoumProgramresultByIdDocument, options);
      }
export function useGetNoumProgramresultByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumProgramresultByIdQuery, GetNoumProgramresultByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumProgramresultByIdQuery, GetNoumProgramresultByIdQueryVariables>(GetNoumProgramresultByIdDocument, options);
        }
export type GetNoumProgramresultByIdQueryHookResult = ReturnType<typeof useGetNoumProgramresultByIdQuery>;
export type GetNoumProgramresultByIdLazyQueryHookResult = ReturnType<typeof useGetNoumProgramresultByIdLazyQuery>;
export type GetNoumProgramresultByIdQueryResult = Apollo.QueryResult<GetNoumProgramresultByIdQuery, GetNoumProgramresultByIdQueryVariables>;