/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendInvoiceReminderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  customMessage?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SendInvoiceReminderMutation = { __typename?: 'Mutation', sendInvoiceReminder?: boolean | null };


export const SendInvoiceReminderDocument = gql`
    mutation sendInvoiceReminder($id: ID!, $customMessage: String) {
  sendInvoiceReminder(id: $id, customMessage: $customMessage)
}
    `;
export type SendInvoiceReminderMutationFn = Apollo.MutationFunction<SendInvoiceReminderMutation, SendInvoiceReminderMutationVariables>;

/**
 * __useSendInvoiceReminderMutation__
 *
 * To run a mutation, you first call `useSendInvoiceReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInvoiceReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInvoiceReminderMutation, { data, loading, error }] = useSendInvoiceReminderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      customMessage: // value for 'customMessage'
 *   },
 * });
 */
export function useSendInvoiceReminderMutation(baseOptions?: Apollo.MutationHookOptions<SendInvoiceReminderMutation, SendInvoiceReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendInvoiceReminderMutation, SendInvoiceReminderMutationVariables>(SendInvoiceReminderDocument, options);
      }
export type SendInvoiceReminderMutationHookResult = ReturnType<typeof useSendInvoiceReminderMutation>;
export type SendInvoiceReminderMutationResult = Apollo.MutationResult<SendInvoiceReminderMutation>;
export type SendInvoiceReminderMutationOptions = Apollo.BaseMutationOptions<SendInvoiceReminderMutation, SendInvoiceReminderMutationVariables>;