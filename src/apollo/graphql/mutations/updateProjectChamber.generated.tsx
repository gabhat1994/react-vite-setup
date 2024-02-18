/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLayoutFragmentDoc } from '../fragments/noumLayout.generated';
import { NetworkOutputFragmentDoc } from '../fragments/networkOutput.generated';
import { TokenFragmentDoc, TokenTransactionFragmentDoc } from '../fragments/token.generated';
import { UserOutputFragmentDoc } from '../fragments/userOutput.generated';
import { SpaceDraftDataFragmentDoc } from '../fragments/spaceOutput.generated';
import { ThemeOutputFragmentDoc } from '../fragments/themeOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectChamberMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  input?: Types.InputMaybe<Types.ProjectChamberUpdateInput>;
}>;


export type UpdateProjectChamberMutation = { __typename?: 'Mutation', updateProjectChamber?: { __typename?: 'SpaceOutput', _id?: string | null, description?: string | null, updatedAt?: any | null, institution?: string | null, name?: string | null, permission?: string | null, profileImage?: string | null, status?: string | null, title?: string | null, type?: string | null, fonts?: any | null, layout?: { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> } | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null, accessToken?: string | null, connectionType?: Types.ConnectionTypeEnum | null, expiryDate?: string | null, isActive?: boolean | null, userId?: string | null } | null> | null, token?: { __typename?: 'Token', _id: string, count: number } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, location?: string | null, bio?: string | null, connection?: Types.ConnectionType | null, userStatus?: string | null, userType?: Types.NoumenaUserType | null, createdAt?: any | null, updatedAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, citizenship?: string | null, SocialHallTCAccepted?: boolean | null, status?: string | null, unreadConnectionCount?: number | null, referralCode?: string | null, profileUrl?: string | null, userOwnReferralCode?: string | null, kycResult?: string | null, creditCheckResult?: string | null, lastLoginAt?: any | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string } | null, draft?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null, title?: string | null, description?: string | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null, unSaved?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null, title?: string | null, description?: string | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null };


export const UpdateProjectChamberDocument = gql`
    mutation updateProjectChamber($id: ID!, $input: ProjectChamberUpdateInput) {
  updateProjectChamber(spaceId: $id, input: $input) {
    _id
    description
    updatedAt
    layout {
      ...NoumLayout
    }
    institution
    name
    networks {
      ...NetworkOutput
    }
    permission
    profileImage
    status
    title
    token {
      ...Token
    }
    type
    uid {
      ...UserOutput
    }
    category {
      _id
    }
    draft {
      ...SpaceDraftData
    }
    unSaved {
      ...SpaceDraftData
    }
    theme {
      ...ThemeOutput
    }
    fonts
  }
}
    ${NoumLayoutFragmentDoc}
${NetworkOutputFragmentDoc}
${TokenFragmentDoc}
${UserOutputFragmentDoc}
${SpaceDraftDataFragmentDoc}
${ThemeOutputFragmentDoc}`;
export type UpdateProjectChamberMutationFn = Apollo.MutationFunction<UpdateProjectChamberMutation, UpdateProjectChamberMutationVariables>;

/**
 * __useUpdateProjectChamberMutation__
 *
 * To run a mutation, you first call `useUpdateProjectChamberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectChamberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectChamberMutation, { data, loading, error }] = useUpdateProjectChamberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectChamberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectChamberMutation, UpdateProjectChamberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectChamberMutation, UpdateProjectChamberMutationVariables>(UpdateProjectChamberDocument, options);
      }
export type UpdateProjectChamberMutationHookResult = ReturnType<typeof useUpdateProjectChamberMutation>;
export type UpdateProjectChamberMutationResult = Apollo.MutationResult<UpdateProjectChamberMutation>;
export type UpdateProjectChamberMutationOptions = Apollo.BaseMutationOptions<UpdateProjectChamberMutation, UpdateProjectChamberMutationVariables>;