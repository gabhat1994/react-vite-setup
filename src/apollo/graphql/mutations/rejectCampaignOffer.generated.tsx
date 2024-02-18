/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectCampaignOfferMutationVariables = Types.Exact<{
  offerId: Types.Scalars['String'];
  reason?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type RejectCampaignOfferMutation = { __typename?: 'Mutation', rejectAdCampaignOffer: { __typename?: 'GenericResponseOutput', success: boolean } };


export const RejectCampaignOfferDocument = gql`
    mutation rejectCampaignOffer($offerId: String!, $reason: String) {
  rejectAdCampaignOffer(offerId: $offerId, reason: $reason) {
    success
  }
}
    `;
export type RejectCampaignOfferMutationFn = Apollo.MutationFunction<RejectCampaignOfferMutation, RejectCampaignOfferMutationVariables>;

/**
 * __useRejectCampaignOfferMutation__
 *
 * To run a mutation, you first call `useRejectCampaignOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectCampaignOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectCampaignOfferMutation, { data, loading, error }] = useRejectCampaignOfferMutation({
 *   variables: {
 *      offerId: // value for 'offerId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectCampaignOfferMutation(baseOptions?: Apollo.MutationHookOptions<RejectCampaignOfferMutation, RejectCampaignOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectCampaignOfferMutation, RejectCampaignOfferMutationVariables>(RejectCampaignOfferDocument, options);
      }
export type RejectCampaignOfferMutationHookResult = ReturnType<typeof useRejectCampaignOfferMutation>;
export type RejectCampaignOfferMutationResult = Apollo.MutationResult<RejectCampaignOfferMutation>;
export type RejectCampaignOfferMutationOptions = Apollo.BaseMutationOptions<RejectCampaignOfferMutation, RejectCampaignOfferMutationVariables>;