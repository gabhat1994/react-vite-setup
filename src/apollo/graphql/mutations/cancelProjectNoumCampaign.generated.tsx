/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelProjectNoumCampaignMutationVariables = Types.Exact<{
  campaignId: Types.Scalars['ID'];
}>;


export type CancelProjectNoumCampaignMutation = { __typename?: 'Mutation', cancelProjectNoumCampaign?: { __typename?: 'ProjectNoumCampaign', _id?: string | null, status?: Types.ProjectNoumCampaignStatus | null } | null };


export const CancelProjectNoumCampaignDocument = gql`
    mutation cancelProjectNoumCampaign($campaignId: ID!) {
  cancelProjectNoumCampaign(campaignId: $campaignId) {
    _id
    status
  }
}
    `;
export type CancelProjectNoumCampaignMutationFn = Apollo.MutationFunction<CancelProjectNoumCampaignMutation, CancelProjectNoumCampaignMutationVariables>;

/**
 * __useCancelProjectNoumCampaignMutation__
 *
 * To run a mutation, you first call `useCancelProjectNoumCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelProjectNoumCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelProjectNoumCampaignMutation, { data, loading, error }] = useCancelProjectNoumCampaignMutation({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCancelProjectNoumCampaignMutation(baseOptions?: Apollo.MutationHookOptions<CancelProjectNoumCampaignMutation, CancelProjectNoumCampaignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelProjectNoumCampaignMutation, CancelProjectNoumCampaignMutationVariables>(CancelProjectNoumCampaignDocument, options);
      }
export type CancelProjectNoumCampaignMutationHookResult = ReturnType<typeof useCancelProjectNoumCampaignMutation>;
export type CancelProjectNoumCampaignMutationResult = Apollo.MutationResult<CancelProjectNoumCampaignMutation>;
export type CancelProjectNoumCampaignMutationOptions = Apollo.BaseMutationOptions<CancelProjectNoumCampaignMutation, CancelProjectNoumCampaignMutationVariables>;