/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ThemeColorsFragmentDoc } from '../fragments/themeColors.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllThemesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllThemesQuery = { __typename?: 'Query', getAllThemes?: { __typename?: 'ThemeOutputResponse', count?: number | null, data?: Array<{ __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null> | null } | null };


export const GetAllThemesDocument = gql`
    query getAllThemes {
  getAllThemes(limit: 100, offset: 0) {
    count
    data {
      _id
      name
      colors {
        ...ThemeColors
      }
    }
  }
}
    ${ThemeColorsFragmentDoc}`;

/**
 * __useGetAllThemesQuery__
 *
 * To run a query within a React component, call `useGetAllThemesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllThemesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllThemesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllThemesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllThemesQuery, GetAllThemesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllThemesQuery, GetAllThemesQueryVariables>(GetAllThemesDocument, options);
      }
export function useGetAllThemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllThemesQuery, GetAllThemesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllThemesQuery, GetAllThemesQueryVariables>(GetAllThemesDocument, options);
        }
export type GetAllThemesQueryHookResult = ReturnType<typeof useGetAllThemesQuery>;
export type GetAllThemesLazyQueryHookResult = ReturnType<typeof useGetAllThemesLazyQuery>;
export type GetAllThemesQueryResult = Apollo.QueryResult<GetAllThemesQuery, GetAllThemesQueryVariables>;