/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectNoumMemberRolePromotionMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type RejectNoumMemberRolePromotionMutation = { __typename?: 'Mutation', rejectNoumMemberRolePromotion: boolean };


export const RejectNoumMemberRolePromotionDocument = gql`
    mutation rejectNoumMemberRolePromotion($noumId: ID!) {
  rejectNoumMemberRolePromotion(noumId: $noumId)
}
    `;
export type RejectNoumMemberRolePromotionMutationFn = Apollo.MutationFunction<RejectNoumMemberRolePromotionMutation, RejectNoumMemberRolePromotionMutationVariables>;

/**
 * __useRejectNoumMemberRolePromotionMutation__
 *
 * To run a mutation, you first call `useRejectNoumMemberRolePromotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectNoumMemberRolePromotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectNoumMemberRolePromotionMutation, { data, loading, error }] = useRejectNoumMemberRolePromotionMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useRejectNoumMemberRolePromotionMutation(baseOptions?: Apollo.MutationHookOptions<RejectNoumMemberRolePromotionMutation, RejectNoumMemberRolePromotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectNoumMemberRolePromotionMutation, RejectNoumMemberRolePromotionMutationVariables>(RejectNoumMemberRolePromotionDocument, options);
      }
export type RejectNoumMemberRolePromotionMutationHookResult = ReturnType<typeof useRejectNoumMemberRolePromotionMutation>;
export type RejectNoumMemberRolePromotionMutationResult = Apollo.MutationResult<RejectNoumMemberRolePromotionMutation>;
export type RejectNoumMemberRolePromotionMutationOptions = Apollo.BaseMutationOptions<RejectNoumMemberRolePromotionMutation, RejectNoumMemberRolePromotionMutationVariables>;