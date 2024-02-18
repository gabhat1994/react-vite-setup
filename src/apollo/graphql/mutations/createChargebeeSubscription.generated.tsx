/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SubscriptionAfterCreatePlanFragmentDoc } from '../fragments/subscription.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateChargebeeSubscriptionMutationVariables = Types.Exact<{
  hosted_id: Types.Scalars['String'];
}>;


export type CreateChargebeeSubscriptionMutation = { __typename?: 'Mutation', createSubscriptionAndInvoiceFromHostedPages: { __typename?: 'SubscriptionOutput', subscription_id: number, status: string } };


export const CreateChargebeeSubscriptionDocument = gql`
    mutation createChargebeeSubscription($hosted_id: String!) {
  createSubscriptionAndInvoiceFromHostedPages(hosted_id: $hosted_id) {
    ...SubscriptionAfterCreatePlan
  }
}
    ${SubscriptionAfterCreatePlanFragmentDoc}`;
export type CreateChargebeeSubscriptionMutationFn = Apollo.MutationFunction<CreateChargebeeSubscriptionMutation, CreateChargebeeSubscriptionMutationVariables>;

/**
 * __useCreateChargebeeSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateChargebeeSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChargebeeSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChargebeeSubscriptionMutation, { data, loading, error }] = useCreateChargebeeSubscriptionMutation({
 *   variables: {
 *      hosted_id: // value for 'hosted_id'
 *   },
 * });
 */
export function useCreateChargebeeSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateChargebeeSubscriptionMutation, CreateChargebeeSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChargebeeSubscriptionMutation, CreateChargebeeSubscriptionMutationVariables>(CreateChargebeeSubscriptionDocument, options);
      }
export type CreateChargebeeSubscriptionMutationHookResult = ReturnType<typeof useCreateChargebeeSubscriptionMutation>;
export type CreateChargebeeSubscriptionMutationResult = Apollo.MutationResult<CreateChargebeeSubscriptionMutation>;
export type CreateChargebeeSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateChargebeeSubscriptionMutation, CreateChargebeeSubscriptionMutationVariables>;