/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { OnboardingQuestionAndAnswersFragmentDoc } from '../fragments/onboarding.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOnboardingQuestionAndAnswersQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetOnboardingQuestionAndAnswersQuery = { __typename?: 'Query', getOnboardingQuestionAndAnswers?: { __typename: 'QuestionAndAnswersOutput', count?: number | null, data?: Array<{ __typename?: 'QuestionAndAnswers', _id?: string | null, question?: string | null, options?: Array<{ __typename?: 'AnswerOptions', answer?: string | null, description?: string | null } | null> | null } | null> | null } | null };


export const GetOnboardingQuestionAndAnswersDocument = gql`
    query getOnboardingQuestionAndAnswers($limit: Int, $offset: Int) {
  getOnboardingQuestionAndAnswers(limit: $limit, offset: $offset) {
    data {
      ...OnboardingQuestionAndAnswers
    }
    count
    __typename
  }
}
    ${OnboardingQuestionAndAnswersFragmentDoc}`;

/**
 * __useGetOnboardingQuestionAndAnswersQuery__
 *
 * To run a query within a React component, call `useGetOnboardingQuestionAndAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnboardingQuestionAndAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnboardingQuestionAndAnswersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetOnboardingQuestionAndAnswersQuery(baseOptions?: Apollo.QueryHookOptions<GetOnboardingQuestionAndAnswersQuery, GetOnboardingQuestionAndAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnboardingQuestionAndAnswersQuery, GetOnboardingQuestionAndAnswersQueryVariables>(GetOnboardingQuestionAndAnswersDocument, options);
      }
export function useGetOnboardingQuestionAndAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnboardingQuestionAndAnswersQuery, GetOnboardingQuestionAndAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnboardingQuestionAndAnswersQuery, GetOnboardingQuestionAndAnswersQueryVariables>(GetOnboardingQuestionAndAnswersDocument, options);
        }
export type GetOnboardingQuestionAndAnswersQueryHookResult = ReturnType<typeof useGetOnboardingQuestionAndAnswersQuery>;
export type GetOnboardingQuestionAndAnswersLazyQueryHookResult = ReturnType<typeof useGetOnboardingQuestionAndAnswersLazyQuery>;
export type GetOnboardingQuestionAndAnswersQueryResult = Apollo.QueryResult<GetOnboardingQuestionAndAnswersQuery, GetOnboardingQuestionAndAnswersQueryVariables>;