/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendPostReportMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ReportInput>;
}>;


export type SendPostReportMutation = { __typename?: 'Mutation', sendPostReport?: { __typename?: 'PostOutput', _id: string } | null };


export const SendPostReportDocument = gql`
    mutation sendPostReport($input: ReportInput) {
  sendPostReport(input: $input) {
    _id
  }
}
    `;
export type SendPostReportMutationFn = Apollo.MutationFunction<SendPostReportMutation, SendPostReportMutationVariables>;

/**
 * __useSendPostReportMutation__
 *
 * To run a mutation, you first call `useSendPostReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPostReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPostReportMutation, { data, loading, error }] = useSendPostReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPostReportMutation(baseOptions?: Apollo.MutationHookOptions<SendPostReportMutation, SendPostReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPostReportMutation, SendPostReportMutationVariables>(SendPostReportDocument, options);
      }
export type SendPostReportMutationHookResult = ReturnType<typeof useSendPostReportMutation>;
export type SendPostReportMutationResult = Apollo.MutationResult<SendPostReportMutation>;
export type SendPostReportMutationOptions = Apollo.BaseMutationOptions<SendPostReportMutation, SendPostReportMutationVariables>;