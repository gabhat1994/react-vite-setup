/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResendDocumentNotificationMutationVariables = Types.Exact<{
  documentId: Types.Scalars['ID'];
  type: Types.ContractSow;
  sendTo: Array<Types.Parties> | Types.Parties;
}>;


export type ResendDocumentNotificationMutation = { __typename?: 'Mutation', resendContractOrSowNotification: boolean };


export const ResendDocumentNotificationDocument = gql`
    mutation ResendDocumentNotification($documentId: ID!, $type: ContractSOW!, $sendTo: [PARTIES!]!) {
  resendContractOrSowNotification(
    documentId: $documentId
    type: $type
    sendTo: $sendTo
  )
}
    `;
export type ResendDocumentNotificationMutationFn = Apollo.MutationFunction<ResendDocumentNotificationMutation, ResendDocumentNotificationMutationVariables>;

/**
 * __useResendDocumentNotificationMutation__
 *
 * To run a mutation, you first call `useResendDocumentNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendDocumentNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendDocumentNotificationMutation, { data, loading, error }] = useResendDocumentNotificationMutation({
 *   variables: {
 *      documentId: // value for 'documentId'
 *      type: // value for 'type'
 *      sendTo: // value for 'sendTo'
 *   },
 * });
 */
export function useResendDocumentNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ResendDocumentNotificationMutation, ResendDocumentNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendDocumentNotificationMutation, ResendDocumentNotificationMutationVariables>(ResendDocumentNotificationDocument, options);
      }
export type ResendDocumentNotificationMutationHookResult = ReturnType<typeof useResendDocumentNotificationMutation>;
export type ResendDocumentNotificationMutationResult = Apollo.MutationResult<ResendDocumentNotificationMutation>;
export type ResendDocumentNotificationMutationOptions = Apollo.BaseMutationOptions<ResendDocumentNotificationMutation, ResendDocumentNotificationMutationVariables>;