/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceConfigQueryVariables = Types.Exact<{
  type: Types.SpaceTypeEnum;
}>;


export type GetSpaceConfigQuery = { __typename?: 'Query', getSpaceConfig?: Array<{ __typename?: 'SpaceProfileValue', id?: string | null, name?: string | null, value?: number | null } | null> | null };


export const GetSpaceConfigDocument = gql`
    query getSpaceConfig($type: SpaceTypeEnum!) {
  getSpaceConfig(type: $type) {
    id
    name
    value
  }
}
    `;

/**
 * __useGetSpaceConfigQuery__
 *
 * To run a query within a React component, call `useGetSpaceConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceConfigQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetSpaceConfigQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceConfigQuery, GetSpaceConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceConfigQuery, GetSpaceConfigQueryVariables>(GetSpaceConfigDocument, options);
      }
export function useGetSpaceConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceConfigQuery, GetSpaceConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceConfigQuery, GetSpaceConfigQueryVariables>(GetSpaceConfigDocument, options);
        }
export type GetSpaceConfigQueryHookResult = ReturnType<typeof useGetSpaceConfigQuery>;
export type GetSpaceConfigLazyQueryHookResult = ReturnType<typeof useGetSpaceConfigLazyQuery>;
export type GetSpaceConfigQueryResult = Apollo.QueryResult<GetSpaceConfigQuery, GetSpaceConfigQueryVariables>;