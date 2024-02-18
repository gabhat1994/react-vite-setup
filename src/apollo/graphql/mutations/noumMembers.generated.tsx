/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumUserConnectionStateFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteNoumMembersMutationVariables = Types.Exact<{
  input: Types.InviteNoumMembers;
}>;


export type InviteNoumMembersMutation = { __typename?: 'Mutation', inviteNoumMembers: boolean };

export type InviteNewNonNoumenaMemberMutationVariables = Types.Exact<{
  input: Types.InviteNonNoumenaMemberInput;
}>;


export type InviteNewNonNoumenaMemberMutation = { __typename?: 'Mutation', inviteNewNonNoumenaMember: boolean };

export type ChangeNoumMembersRoleMutationVariables = Types.Exact<{
  input: Types.ChangeNoumMemberRoleInput;
}>;


export type ChangeNoumMembersRoleMutation = { __typename?: 'Mutation', changeNoumMembersRole: boolean };

export type KickNoumMembersMutationVariables = Types.Exact<{
  memberIDs: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type KickNoumMembersMutation = { __typename?: 'Mutation', kickNoumMembers: boolean };

export type CancelNoumInvitationMutationVariables = Types.Exact<{
  memberId: Types.Scalars['ID'];
}>;


export type CancelNoumInvitationMutation = { __typename?: 'Mutation', cancelNoumInvitation: boolean };

export type ApproveNoumInvitationMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type ApproveNoumInvitationMutation = { __typename?: 'Mutation', approveNoumInvitation: boolean };

export type RejectNoumInvitationMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type RejectNoumInvitationMutation = { __typename?: 'Mutation', rejectNoumInvitation: boolean };

export type ApproveConnectionRequestMutationVariables = Types.Exact<{
  connectionRequestId: Types.Scalars['ID'];
}>;


export type ApproveConnectionRequestMutation = { __typename?: 'Mutation', approveConnectionRequest: boolean };

export type RejectConnectionRequestMutationVariables = Types.Exact<{
  connectionRequestId: Types.Scalars['ID'];
}>;


export type RejectConnectionRequestMutation = { __typename?: 'Mutation', rejectConnectionRequest: boolean };

export type CancelNoumMemberRolePromotionMutationVariables = Types.Exact<{
  memberId: Types.Scalars['ID'];
}>;


export type CancelNoumMemberRolePromotionMutation = { __typename?: 'Mutation', cancelNoumMemberRolePromotion: boolean };

export type LeaveNoumMembershipMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type LeaveNoumMembershipMutation = { __typename?: 'Mutation', leaveNoumMembership: boolean };

export type ConnectToNoumMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  userHomeNoumId: Types.Scalars['ID'];
}>;


export type ConnectToNoumMutation = { __typename?: 'Mutation', connectToNoum: { __typename?: 'SpaceOutput', _id?: string | null, isFollowing?: boolean | null, connectionRole?: string | null, connectionId?: string | null, isConnected?: boolean | null, connectionWithNoum?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null, membershipStatus?: { __typename?: 'NoumMembershipStatus', _id: string, status: Types.NoumMemberStatus, connectedAt?: any | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, invitationSentFrom?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null } };

export type CancelConnectionRequestToNoumMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type CancelConnectionRequestToNoumMutation = { __typename?: 'Mutation', cancelConnectionRequestToNoum: boolean };


export const InviteNoumMembersDocument = gql`
    mutation InviteNoumMembers($input: InviteNoumMembers!) {
  inviteNoumMembers(input: $input)
}
    `;
export type InviteNoumMembersMutationFn = Apollo.MutationFunction<InviteNoumMembersMutation, InviteNoumMembersMutationVariables>;

/**
 * __useInviteNoumMembersMutation__
 *
 * To run a mutation, you first call `useInviteNoumMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteNoumMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteNoumMembersMutation, { data, loading, error }] = useInviteNoumMembersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteNoumMembersMutation(baseOptions?: Apollo.MutationHookOptions<InviteNoumMembersMutation, InviteNoumMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteNoumMembersMutation, InviteNoumMembersMutationVariables>(InviteNoumMembersDocument, options);
      }
export type InviteNoumMembersMutationHookResult = ReturnType<typeof useInviteNoumMembersMutation>;
export type InviteNoumMembersMutationResult = Apollo.MutationResult<InviteNoumMembersMutation>;
export type InviteNoumMembersMutationOptions = Apollo.BaseMutationOptions<InviteNoumMembersMutation, InviteNoumMembersMutationVariables>;
export const InviteNewNonNoumenaMemberDocument = gql`
    mutation InviteNewNonNoumenaMember($input: InviteNonNoumenaMemberInput!) {
  inviteNewNonNoumenaMember(input: $input)
}
    `;
export type InviteNewNonNoumenaMemberMutationFn = Apollo.MutationFunction<InviteNewNonNoumenaMemberMutation, InviteNewNonNoumenaMemberMutationVariables>;

/**
 * __useInviteNewNonNoumenaMemberMutation__
 *
 * To run a mutation, you first call `useInviteNewNonNoumenaMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteNewNonNoumenaMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteNewNonNoumenaMemberMutation, { data, loading, error }] = useInviteNewNonNoumenaMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteNewNonNoumenaMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteNewNonNoumenaMemberMutation, InviteNewNonNoumenaMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteNewNonNoumenaMemberMutation, InviteNewNonNoumenaMemberMutationVariables>(InviteNewNonNoumenaMemberDocument, options);
      }
export type InviteNewNonNoumenaMemberMutationHookResult = ReturnType<typeof useInviteNewNonNoumenaMemberMutation>;
export type InviteNewNonNoumenaMemberMutationResult = Apollo.MutationResult<InviteNewNonNoumenaMemberMutation>;
export type InviteNewNonNoumenaMemberMutationOptions = Apollo.BaseMutationOptions<InviteNewNonNoumenaMemberMutation, InviteNewNonNoumenaMemberMutationVariables>;
export const ChangeNoumMembersRoleDocument = gql`
    mutation ChangeNoumMembersRole($input: ChangeNoumMemberRoleInput!) {
  changeNoumMembersRole(input: $input)
}
    `;
export type ChangeNoumMembersRoleMutationFn = Apollo.MutationFunction<ChangeNoumMembersRoleMutation, ChangeNoumMembersRoleMutationVariables>;

/**
 * __useChangeNoumMembersRoleMutation__
 *
 * To run a mutation, you first call `useChangeNoumMembersRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeNoumMembersRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeNoumMembersRoleMutation, { data, loading, error }] = useChangeNoumMembersRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeNoumMembersRoleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeNoumMembersRoleMutation, ChangeNoumMembersRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeNoumMembersRoleMutation, ChangeNoumMembersRoleMutationVariables>(ChangeNoumMembersRoleDocument, options);
      }
export type ChangeNoumMembersRoleMutationHookResult = ReturnType<typeof useChangeNoumMembersRoleMutation>;
export type ChangeNoumMembersRoleMutationResult = Apollo.MutationResult<ChangeNoumMembersRoleMutation>;
export type ChangeNoumMembersRoleMutationOptions = Apollo.BaseMutationOptions<ChangeNoumMembersRoleMutation, ChangeNoumMembersRoleMutationVariables>;
export const KickNoumMembersDocument = gql`
    mutation KickNoumMembers($memberIDs: [ID!]!) {
  kickNoumMembers(memberIDs: $memberIDs)
}
    `;
export type KickNoumMembersMutationFn = Apollo.MutationFunction<KickNoumMembersMutation, KickNoumMembersMutationVariables>;

/**
 * __useKickNoumMembersMutation__
 *
 * To run a mutation, you first call `useKickNoumMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickNoumMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickNoumMembersMutation, { data, loading, error }] = useKickNoumMembersMutation({
 *   variables: {
 *      memberIDs: // value for 'memberIDs'
 *   },
 * });
 */
export function useKickNoumMembersMutation(baseOptions?: Apollo.MutationHookOptions<KickNoumMembersMutation, KickNoumMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickNoumMembersMutation, KickNoumMembersMutationVariables>(KickNoumMembersDocument, options);
      }
export type KickNoumMembersMutationHookResult = ReturnType<typeof useKickNoumMembersMutation>;
export type KickNoumMembersMutationResult = Apollo.MutationResult<KickNoumMembersMutation>;
export type KickNoumMembersMutationOptions = Apollo.BaseMutationOptions<KickNoumMembersMutation, KickNoumMembersMutationVariables>;
export const CancelNoumInvitationDocument = gql`
    mutation CancelNoumInvitation($memberId: ID!) {
  cancelNoumInvitation(memberId: $memberId)
}
    `;
export type CancelNoumInvitationMutationFn = Apollo.MutationFunction<CancelNoumInvitationMutation, CancelNoumInvitationMutationVariables>;

/**
 * __useCancelNoumInvitationMutation__
 *
 * To run a mutation, you first call `useCancelNoumInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelNoumInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelNoumInvitationMutation, { data, loading, error }] = useCancelNoumInvitationMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useCancelNoumInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CancelNoumInvitationMutation, CancelNoumInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelNoumInvitationMutation, CancelNoumInvitationMutationVariables>(CancelNoumInvitationDocument, options);
      }
export type CancelNoumInvitationMutationHookResult = ReturnType<typeof useCancelNoumInvitationMutation>;
export type CancelNoumInvitationMutationResult = Apollo.MutationResult<CancelNoumInvitationMutation>;
export type CancelNoumInvitationMutationOptions = Apollo.BaseMutationOptions<CancelNoumInvitationMutation, CancelNoumInvitationMutationVariables>;
export const ApproveNoumInvitationDocument = gql`
    mutation ApproveNoumInvitation($noumId: ID!) {
  approveNoumInvitation(noumId: $noumId)
}
    `;
export type ApproveNoumInvitationMutationFn = Apollo.MutationFunction<ApproveNoumInvitationMutation, ApproveNoumInvitationMutationVariables>;

/**
 * __useApproveNoumInvitationMutation__
 *
 * To run a mutation, you first call `useApproveNoumInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveNoumInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveNoumInvitationMutation, { data, loading, error }] = useApproveNoumInvitationMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useApproveNoumInvitationMutation(baseOptions?: Apollo.MutationHookOptions<ApproveNoumInvitationMutation, ApproveNoumInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveNoumInvitationMutation, ApproveNoumInvitationMutationVariables>(ApproveNoumInvitationDocument, options);
      }
export type ApproveNoumInvitationMutationHookResult = ReturnType<typeof useApproveNoumInvitationMutation>;
export type ApproveNoumInvitationMutationResult = Apollo.MutationResult<ApproveNoumInvitationMutation>;
export type ApproveNoumInvitationMutationOptions = Apollo.BaseMutationOptions<ApproveNoumInvitationMutation, ApproveNoumInvitationMutationVariables>;
export const RejectNoumInvitationDocument = gql`
    mutation RejectNoumInvitation($noumId: ID!) {
  rejectNoumInvitation(noumId: $noumId)
}
    `;
export type RejectNoumInvitationMutationFn = Apollo.MutationFunction<RejectNoumInvitationMutation, RejectNoumInvitationMutationVariables>;

/**
 * __useRejectNoumInvitationMutation__
 *
 * To run a mutation, you first call `useRejectNoumInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectNoumInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectNoumInvitationMutation, { data, loading, error }] = useRejectNoumInvitationMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useRejectNoumInvitationMutation(baseOptions?: Apollo.MutationHookOptions<RejectNoumInvitationMutation, RejectNoumInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectNoumInvitationMutation, RejectNoumInvitationMutationVariables>(RejectNoumInvitationDocument, options);
      }
export type RejectNoumInvitationMutationHookResult = ReturnType<typeof useRejectNoumInvitationMutation>;
export type RejectNoumInvitationMutationResult = Apollo.MutationResult<RejectNoumInvitationMutation>;
export type RejectNoumInvitationMutationOptions = Apollo.BaseMutationOptions<RejectNoumInvitationMutation, RejectNoumInvitationMutationVariables>;
export const ApproveConnectionRequestDocument = gql`
    mutation ApproveConnectionRequest($connectionRequestId: ID!) {
  approveConnectionRequest(connectionRequestId: $connectionRequestId)
}
    `;
export type ApproveConnectionRequestMutationFn = Apollo.MutationFunction<ApproveConnectionRequestMutation, ApproveConnectionRequestMutationVariables>;

/**
 * __useApproveConnectionRequestMutation__
 *
 * To run a mutation, you first call `useApproveConnectionRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveConnectionRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveConnectionRequestMutation, { data, loading, error }] = useApproveConnectionRequestMutation({
 *   variables: {
 *      connectionRequestId: // value for 'connectionRequestId'
 *   },
 * });
 */
export function useApproveConnectionRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveConnectionRequestMutation, ApproveConnectionRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveConnectionRequestMutation, ApproveConnectionRequestMutationVariables>(ApproveConnectionRequestDocument, options);
      }
export type ApproveConnectionRequestMutationHookResult = ReturnType<typeof useApproveConnectionRequestMutation>;
export type ApproveConnectionRequestMutationResult = Apollo.MutationResult<ApproveConnectionRequestMutation>;
export type ApproveConnectionRequestMutationOptions = Apollo.BaseMutationOptions<ApproveConnectionRequestMutation, ApproveConnectionRequestMutationVariables>;
export const RejectConnectionRequestDocument = gql`
    mutation RejectConnectionRequest($connectionRequestId: ID!) {
  rejectConnectionRequest(connectionRequestId: $connectionRequestId)
}
    `;
export type RejectConnectionRequestMutationFn = Apollo.MutationFunction<RejectConnectionRequestMutation, RejectConnectionRequestMutationVariables>;

/**
 * __useRejectConnectionRequestMutation__
 *
 * To run a mutation, you first call `useRejectConnectionRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectConnectionRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectConnectionRequestMutation, { data, loading, error }] = useRejectConnectionRequestMutation({
 *   variables: {
 *      connectionRequestId: // value for 'connectionRequestId'
 *   },
 * });
 */
export function useRejectConnectionRequestMutation(baseOptions?: Apollo.MutationHookOptions<RejectConnectionRequestMutation, RejectConnectionRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectConnectionRequestMutation, RejectConnectionRequestMutationVariables>(RejectConnectionRequestDocument, options);
      }
export type RejectConnectionRequestMutationHookResult = ReturnType<typeof useRejectConnectionRequestMutation>;
export type RejectConnectionRequestMutationResult = Apollo.MutationResult<RejectConnectionRequestMutation>;
export type RejectConnectionRequestMutationOptions = Apollo.BaseMutationOptions<RejectConnectionRequestMutation, RejectConnectionRequestMutationVariables>;
export const CancelNoumMemberRolePromotionDocument = gql`
    mutation cancelNoumMemberRolePromotion($memberId: ID!) {
  cancelNoumMemberRolePromotion(memberId: $memberId)
}
    `;
export type CancelNoumMemberRolePromotionMutationFn = Apollo.MutationFunction<CancelNoumMemberRolePromotionMutation, CancelNoumMemberRolePromotionMutationVariables>;

/**
 * __useCancelNoumMemberRolePromotionMutation__
 *
 * To run a mutation, you first call `useCancelNoumMemberRolePromotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelNoumMemberRolePromotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelNoumMemberRolePromotionMutation, { data, loading, error }] = useCancelNoumMemberRolePromotionMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useCancelNoumMemberRolePromotionMutation(baseOptions?: Apollo.MutationHookOptions<CancelNoumMemberRolePromotionMutation, CancelNoumMemberRolePromotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelNoumMemberRolePromotionMutation, CancelNoumMemberRolePromotionMutationVariables>(CancelNoumMemberRolePromotionDocument, options);
      }
export type CancelNoumMemberRolePromotionMutationHookResult = ReturnType<typeof useCancelNoumMemberRolePromotionMutation>;
export type CancelNoumMemberRolePromotionMutationResult = Apollo.MutationResult<CancelNoumMemberRolePromotionMutation>;
export type CancelNoumMemberRolePromotionMutationOptions = Apollo.BaseMutationOptions<CancelNoumMemberRolePromotionMutation, CancelNoumMemberRolePromotionMutationVariables>;
export const LeaveNoumMembershipDocument = gql`
    mutation leaveNoumMembership($noumId: ID!) {
  leaveNoumMembership(noumId: $noumId)
}
    `;
export type LeaveNoumMembershipMutationFn = Apollo.MutationFunction<LeaveNoumMembershipMutation, LeaveNoumMembershipMutationVariables>;

/**
 * __useLeaveNoumMembershipMutation__
 *
 * To run a mutation, you first call `useLeaveNoumMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveNoumMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveNoumMembershipMutation, { data, loading, error }] = useLeaveNoumMembershipMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useLeaveNoumMembershipMutation(baseOptions?: Apollo.MutationHookOptions<LeaveNoumMembershipMutation, LeaveNoumMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveNoumMembershipMutation, LeaveNoumMembershipMutationVariables>(LeaveNoumMembershipDocument, options);
      }
export type LeaveNoumMembershipMutationHookResult = ReturnType<typeof useLeaveNoumMembershipMutation>;
export type LeaveNoumMembershipMutationResult = Apollo.MutationResult<LeaveNoumMembershipMutation>;
export type LeaveNoumMembershipMutationOptions = Apollo.BaseMutationOptions<LeaveNoumMembershipMutation, LeaveNoumMembershipMutationVariables>;
export const ConnectToNoumDocument = gql`
    mutation connectToNoum($noumId: ID!, $userHomeNoumId: ID!) {
  connectToNoum(noumId: $noumId) {
    _id
    ...NoumUserConnectionState
  }
}
    ${NoumUserConnectionStateFragmentDoc}`;
export type ConnectToNoumMutationFn = Apollo.MutationFunction<ConnectToNoumMutation, ConnectToNoumMutationVariables>;

/**
 * __useConnectToNoumMutation__
 *
 * To run a mutation, you first call `useConnectToNoumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectToNoumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectToNoumMutation, { data, loading, error }] = useConnectToNoumMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      userHomeNoumId: // value for 'userHomeNoumId'
 *   },
 * });
 */
export function useConnectToNoumMutation(baseOptions?: Apollo.MutationHookOptions<ConnectToNoumMutation, ConnectToNoumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectToNoumMutation, ConnectToNoumMutationVariables>(ConnectToNoumDocument, options);
      }
export type ConnectToNoumMutationHookResult = ReturnType<typeof useConnectToNoumMutation>;
export type ConnectToNoumMutationResult = Apollo.MutationResult<ConnectToNoumMutation>;
export type ConnectToNoumMutationOptions = Apollo.BaseMutationOptions<ConnectToNoumMutation, ConnectToNoumMutationVariables>;
export const CancelConnectionRequestToNoumDocument = gql`
    mutation cancelConnectionRequestToNoum($noumId: ID!) {
  cancelConnectionRequestToNoum(noumId: $noumId)
}
    `;
export type CancelConnectionRequestToNoumMutationFn = Apollo.MutationFunction<CancelConnectionRequestToNoumMutation, CancelConnectionRequestToNoumMutationVariables>;

/**
 * __useCancelConnectionRequestToNoumMutation__
 *
 * To run a mutation, you first call `useCancelConnectionRequestToNoumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelConnectionRequestToNoumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelConnectionRequestToNoumMutation, { data, loading, error }] = useCancelConnectionRequestToNoumMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useCancelConnectionRequestToNoumMutation(baseOptions?: Apollo.MutationHookOptions<CancelConnectionRequestToNoumMutation, CancelConnectionRequestToNoumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelConnectionRequestToNoumMutation, CancelConnectionRequestToNoumMutationVariables>(CancelConnectionRequestToNoumDocument, options);
      }
export type CancelConnectionRequestToNoumMutationHookResult = ReturnType<typeof useCancelConnectionRequestToNoumMutation>;
export type CancelConnectionRequestToNoumMutationResult = Apollo.MutationResult<CancelConnectionRequestToNoumMutation>;
export type CancelConnectionRequestToNoumMutationOptions = Apollo.BaseMutationOptions<CancelConnectionRequestToNoumMutation, CancelConnectionRequestToNoumMutationVariables>;