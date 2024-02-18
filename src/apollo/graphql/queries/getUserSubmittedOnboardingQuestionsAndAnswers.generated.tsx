/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserSubmittedOnboardingQuestionsAndAnswersQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetUserSubmittedOnboardingQuestionsAndAnswersQuery = { __typename?: 'Query', getUserSubmittedOnboardingQuestionsAndAnswers?: { __typename?: 'UserSelectedQuestionAndAnswersOutputObject', userId?: string | null, userSelection?: Array<{ __typename?: 'UserSelectionForQuestionAndAnswers', _id?: string | null, questionId?: string | null, answer?: string | null } | null> | null } | null };


export const GetUserSubmittedOnboardingQuestionsAndAnswersDocument = gql`
    query getUserSubmittedOnboardingQuestionsAndAnswers($userId: ID) {
  getUserSubmittedOnboardingQuestionsAndAnswers(userId: $userId) {
    userId
    userSelection {
      _id
      questionId
      answer
    }
  }
}
    `;

/**
 * __useGetUserSubmittedOnboardingQuestionsAndAnswersQuery__
 *
 * To run a query within a React component, call `useGetUserSubmittedOnboardingQuestionsAndAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSubmittedOnboardingQuestionsAndAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSubmittedOnboardingQuestionsAndAnswersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserSubmittedOnboardingQuestionsAndAnswersQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSubmittedOnboardingQuestionsAndAnswersQuery, GetUserSubmittedOnboardingQuestionsAndAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSubmittedOnboardingQuestionsAndAnswersQuery, GetUserSubmittedOnboardingQuestionsAndAnswersQueryVariables>(GetUserSubmittedOnboardingQuestionsAndAnswersDocument, options);
      }
export function useGetUserSubmittedOnboardingQuestionsAndAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSubmittedOnboardingQuestionsAndAnswersQuery, GetUserSubmittedOnboardingQuestionsAndAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSubmittedOnboardingQuestionsAndAnswersQuery, GetUserSubmittedOnboardingQuestionsAndAnswersQueryVariables>(GetUserSubmittedOnboardingQuestionsAndAnswersDocument, options);
        }
export type GetUserSubmittedOnboardingQuestionsAndAnswersQueryHookResult = ReturnType<typeof useGetUserSubmittedOnboardingQuestionsAndAnswersQuery>;
export type GetUserSubmittedOnboardingQuestionsAndAnswersLazyQueryHookResult = ReturnType<typeof useGetUserSubmittedOnboardingQuestionsAndAnswersLazyQuery>;
export type GetUserSubmittedOnboardingQuestionsAndAnswersQueryResult = Apollo.QueryResult<GetUserSubmittedOnboardingQuestionsAndAnswersQuery, GetUserSubmittedOnboardingQuestionsAndAnswersQueryVariables>;