/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCategoryWithSkillsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetCategoryWithSkillsQuery = { __typename?: 'Query', getCategoryWithSkills?: Array<{ __typename?: 'CategoryWithSkills', _id: string, name: string, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null } | null> | null };


export const GetCategoryWithSkillsDocument = gql`
    query getCategoryWithSkills($limit: Int, $offset: Int, $search: String) {
  getCategoryWithSkills(limit: $limit, offset: $offset, search: $search) {
    _id
    name
    skills {
      _id
      icon
      name
    }
  }
}
    `;

/**
 * __useGetCategoryWithSkillsQuery__
 *
 * To run a query within a React component, call `useGetCategoryWithSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryWithSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryWithSkillsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetCategoryWithSkillsQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryWithSkillsQuery, GetCategoryWithSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryWithSkillsQuery, GetCategoryWithSkillsQueryVariables>(GetCategoryWithSkillsDocument, options);
      }
export function useGetCategoryWithSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryWithSkillsQuery, GetCategoryWithSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryWithSkillsQuery, GetCategoryWithSkillsQueryVariables>(GetCategoryWithSkillsDocument, options);
        }
export type GetCategoryWithSkillsQueryHookResult = ReturnType<typeof useGetCategoryWithSkillsQuery>;
export type GetCategoryWithSkillsLazyQueryHookResult = ReturnType<typeof useGetCategoryWithSkillsLazyQuery>;
export type GetCategoryWithSkillsQueryResult = Apollo.QueryResult<GetCategoryWithSkillsQuery, GetCategoryWithSkillsQueryVariables>;