/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSecurityQuestionsResetQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSecurityQuestionsResetQuery = { __typename?: 'Query', getSecurityQuestionsForReset: Array<{ __typename?: 'QuestionOutput', id: string, question: string }> };


export const GetSecurityQuestionsResetDocument = gql`
    query getSecurityQuestionsReset {
  getSecurityQuestionsForReset {
    id
    question
  }
}
    `;

/**
 * __useGetSecurityQuestionsResetQuery__
 *
 * To run a query within a React component, call `useGetSecurityQuestionsResetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSecurityQuestionsResetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSecurityQuestionsResetQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSecurityQuestionsResetQuery(baseOptions?: Apollo.QueryHookOptions<GetSecurityQuestionsResetQuery, GetSecurityQuestionsResetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSecurityQuestionsResetQuery, GetSecurityQuestionsResetQueryVariables>(GetSecurityQuestionsResetDocument, options);
      }
export function useGetSecurityQuestionsResetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSecurityQuestionsResetQuery, GetSecurityQuestionsResetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSecurityQuestionsResetQuery, GetSecurityQuestionsResetQueryVariables>(GetSecurityQuestionsResetDocument, options);
        }
export type GetSecurityQuestionsResetQueryHookResult = ReturnType<typeof useGetSecurityQuestionsResetQuery>;
export type GetSecurityQuestionsResetLazyQueryHookResult = ReturnType<typeof useGetSecurityQuestionsResetLazyQuery>;
export type GetSecurityQuestionsResetQueryResult = Apollo.QueryResult<GetSecurityQuestionsResetQuery, GetSecurityQuestionsResetQueryVariables>;