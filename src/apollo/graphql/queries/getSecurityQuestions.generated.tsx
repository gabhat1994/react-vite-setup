/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSecurityQuestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSecurityQuestionsQuery = { __typename?: 'Query', getQuestionnaire: Array<{ __typename?: 'QuestionOutput', id: string, question: string }> };


export const GetSecurityQuestionsDocument = gql`
    query getSecurityQuestions {
  getQuestionnaire {
    id
    question
  }
}
    `;

/**
 * __useGetSecurityQuestionsQuery__
 *
 * To run a query within a React component, call `useGetSecurityQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSecurityQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSecurityQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSecurityQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSecurityQuestionsQuery, GetSecurityQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSecurityQuestionsQuery, GetSecurityQuestionsQueryVariables>(GetSecurityQuestionsDocument, options);
      }
export function useGetSecurityQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSecurityQuestionsQuery, GetSecurityQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSecurityQuestionsQuery, GetSecurityQuestionsQueryVariables>(GetSecurityQuestionsDocument, options);
        }
export type GetSecurityQuestionsQueryHookResult = ReturnType<typeof useGetSecurityQuestionsQuery>;
export type GetSecurityQuestionsLazyQueryHookResult = ReturnType<typeof useGetSecurityQuestionsLazyQuery>;
export type GetSecurityQuestionsQueryResult = Apollo.QueryResult<GetSecurityQuestionsQuery, GetSecurityQuestionsQueryVariables>;