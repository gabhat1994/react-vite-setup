/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddAnswerMutationVariables = Types.Exact<{
  questionId: Types.Scalars['ID'];
  answerBody: Types.Scalars['String'];
}>;


export type AddAnswerMutation = { __typename?: 'Mutation', addAnswer?: { __typename?: 'NoumQuestionOutput', _id?: string | null, answers?: Array<{ __typename?: 'AnswerOutput', _id?: string | null, body?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string } | null } | null> | null } | null };


export const AddAnswerDocument = gql`
    mutation addAnswer($questionId: ID!, $answerBody: String!) {
  addAnswer(questionId: $questionId, answerBody: $answerBody) {
    _id
    answers {
      _id
      body
      createdAt
      updatedAt
      user {
        _id
      }
    }
  }
}
    `;
export type AddAnswerMutationFn = Apollo.MutationFunction<AddAnswerMutation, AddAnswerMutationVariables>;

/**
 * __useAddAnswerMutation__
 *
 * To run a mutation, you first call `useAddAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAnswerMutation, { data, loading, error }] = useAddAnswerMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      answerBody: // value for 'answerBody'
 *   },
 * });
 */
export function useAddAnswerMutation(baseOptions?: Apollo.MutationHookOptions<AddAnswerMutation, AddAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAnswerMutation, AddAnswerMutationVariables>(AddAnswerDocument, options);
      }
export type AddAnswerMutationHookResult = ReturnType<typeof useAddAnswerMutation>;
export type AddAnswerMutationResult = Apollo.MutationResult<AddAnswerMutation>;
export type AddAnswerMutationOptions = Apollo.BaseMutationOptions<AddAnswerMutation, AddAnswerMutationVariables>;