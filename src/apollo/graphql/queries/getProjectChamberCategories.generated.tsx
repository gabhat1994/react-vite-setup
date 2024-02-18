/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectChamberCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetProjectChamberCategoriesQuery = { __typename?: 'Query', getProjectChamberCategories?: Array<{ __typename?: 'ProjectChamberCategory', _id: string, name: string }> | null };


export const GetProjectChamberCategoriesDocument = gql`
    query getProjectChamberCategories {
  getProjectChamberCategories {
    _id
    name
  }
}
    `;

/**
 * __useGetProjectChamberCategoriesQuery__
 *
 * To run a query within a React component, call `useGetProjectChamberCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectChamberCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectChamberCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectChamberCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectChamberCategoriesQuery, GetProjectChamberCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectChamberCategoriesQuery, GetProjectChamberCategoriesQueryVariables>(GetProjectChamberCategoriesDocument, options);
      }
export function useGetProjectChamberCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectChamberCategoriesQuery, GetProjectChamberCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectChamberCategoriesQuery, GetProjectChamberCategoriesQueryVariables>(GetProjectChamberCategoriesDocument, options);
        }
export type GetProjectChamberCategoriesQueryHookResult = ReturnType<typeof useGetProjectChamberCategoriesQuery>;
export type GetProjectChamberCategoriesLazyQueryHookResult = ReturnType<typeof useGetProjectChamberCategoriesLazyQuery>;
export type GetProjectChamberCategoriesQueryResult = Apollo.QueryResult<GetProjectChamberCategoriesQuery, GetProjectChamberCategoriesQueryVariables>;