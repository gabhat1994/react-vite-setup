/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLinkFragmentDoc } from '../fragments/noumLink.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnlinkNoumLinkMutationVariables = Types.Exact<{
  noumLinkId: Types.Scalars['ID'];
}>;


export type UnlinkNoumLinkMutation = { __typename?: 'Mutation', unlinkNoumLink?: { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null };


export const UnlinkNoumLinkDocument = gql`
    mutation unlinkNoumLink($noumLinkId: ID!) {
  unlinkNoumLink(noumLinkId: $noumLinkId) {
    ...NoumLink
  }
}
    ${NoumLinkFragmentDoc}`;
export type UnlinkNoumLinkMutationFn = Apollo.MutationFunction<UnlinkNoumLinkMutation, UnlinkNoumLinkMutationVariables>;

/**
 * __useUnlinkNoumLinkMutation__
 *
 * To run a mutation, you first call `useUnlinkNoumLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkNoumLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkNoumLinkMutation, { data, loading, error }] = useUnlinkNoumLinkMutation({
 *   variables: {
 *      noumLinkId: // value for 'noumLinkId'
 *   },
 * });
 */
export function useUnlinkNoumLinkMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkNoumLinkMutation, UnlinkNoumLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkNoumLinkMutation, UnlinkNoumLinkMutationVariables>(UnlinkNoumLinkDocument, options);
      }
export type UnlinkNoumLinkMutationHookResult = ReturnType<typeof useUnlinkNoumLinkMutation>;
export type UnlinkNoumLinkMutationResult = Apollo.MutationResult<UnlinkNoumLinkMutation>;
export type UnlinkNoumLinkMutationOptions = Apollo.BaseMutationOptions<UnlinkNoumLinkMutation, UnlinkNoumLinkMutationVariables>;