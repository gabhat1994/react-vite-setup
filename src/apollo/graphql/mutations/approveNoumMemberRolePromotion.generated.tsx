/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveNoumMemberRolePromotionMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type ApproveNoumMemberRolePromotionMutation = { __typename?: 'Mutation', approveNoumMemberRolePromotion: boolean };


export const ApproveNoumMemberRolePromotionDocument = gql`
    mutation approveNoumMemberRolePromotion($noumId: ID!) {
  approveNoumMemberRolePromotion(noumId: $noumId)
}
    `;
export type ApproveNoumMemberRolePromotionMutationFn = Apollo.MutationFunction<ApproveNoumMemberRolePromotionMutation, ApproveNoumMemberRolePromotionMutationVariables>;

/**
 * __useApproveNoumMemberRolePromotionMutation__
 *
 * To run a mutation, you first call `useApproveNoumMemberRolePromotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveNoumMemberRolePromotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveNoumMemberRolePromotionMutation, { data, loading, error }] = useApproveNoumMemberRolePromotionMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useApproveNoumMemberRolePromotionMutation(baseOptions?: Apollo.MutationHookOptions<ApproveNoumMemberRolePromotionMutation, ApproveNoumMemberRolePromotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveNoumMemberRolePromotionMutation, ApproveNoumMemberRolePromotionMutationVariables>(ApproveNoumMemberRolePromotionDocument, options);
      }
export type ApproveNoumMemberRolePromotionMutationHookResult = ReturnType<typeof useApproveNoumMemberRolePromotionMutation>;
export type ApproveNoumMemberRolePromotionMutationResult = Apollo.MutationResult<ApproveNoumMemberRolePromotionMutation>;
export type ApproveNoumMemberRolePromotionMutationOptions = Apollo.BaseMutationOptions<ApproveNoumMemberRolePromotionMutation, ApproveNoumMemberRolePromotionMutationVariables>;