/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceBasicFragmentDoc, SpaceDraftDataFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChangeProjectChamberStatusMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  status?: Types.InputMaybe<Types.SpaceStatusEnum>;
}>;


export type ChangeProjectChamberStatusMutation = { __typename?: 'Mutation', changeProjectChamberStatus?: { __typename?: 'SpaceOutput', _id?: string | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, institution?: string | null, type?: string | null, permission?: string | null, projectType?: string | null, updatedAt?: any | null, publishedAt?: any | null, isFollowing?: boolean | null, followersCount?: number | null, fonts?: any | null, unSaved?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null, title?: string | null, description?: string | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null, draft?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null, title?: string | null, description?: string | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null };


export const ChangeProjectChamberStatusDocument = gql`
    mutation changeProjectChamberStatus($spaceId: ID!, $status: SpaceStatusEnum) {
  changeProjectChamberStatus(spaceId: $spaceId, status: $status) {
    ...SpaceBasic
    _id
    status
    tempStatus
    name
    title
    description
    profileImage
    institution
    type
    permission
    projectType
    unSaved {
      ...SpaceDraftData
    }
    draft {
      ...SpaceDraftData
    }
    updatedAt
    publishedAt
  }
}
    ${SpaceBasicFragmentDoc}
${SpaceDraftDataFragmentDoc}`;
export type ChangeProjectChamberStatusMutationFn = Apollo.MutationFunction<ChangeProjectChamberStatusMutation, ChangeProjectChamberStatusMutationVariables>;

/**
 * __useChangeProjectChamberStatusMutation__
 *
 * To run a mutation, you first call `useChangeProjectChamberStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProjectChamberStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProjectChamberStatusMutation, { data, loading, error }] = useChangeProjectChamberStatusMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeProjectChamberStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProjectChamberStatusMutation, ChangeProjectChamberStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProjectChamberStatusMutation, ChangeProjectChamberStatusMutationVariables>(ChangeProjectChamberStatusDocument, options);
      }
export type ChangeProjectChamberStatusMutationHookResult = ReturnType<typeof useChangeProjectChamberStatusMutation>;
export type ChangeProjectChamberStatusMutationResult = Apollo.MutationResult<ChangeProjectChamberStatusMutation>;
export type ChangeProjectChamberStatusMutationOptions = Apollo.BaseMutationOptions<ChangeProjectChamberStatusMutation, ChangeProjectChamberStatusMutationVariables>;