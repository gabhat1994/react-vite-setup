/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLinkFragmentDoc } from '../fragments/noumLink.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnlinkNoumsMutationVariables = Types.Exact<{
  noumLinkId: Types.Scalars['ID'];
  linkedNoumIDs: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type UnlinkNoumsMutation = { __typename?: 'Mutation', unlinkNoums?: { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null };


export const UnlinkNoumsDocument = gql`
    mutation unlinkNoums($noumLinkId: ID!, $linkedNoumIDs: [ID!]!) {
  unlinkNoums(noumLinkId: $noumLinkId, linkedNoumIDs: $linkedNoumIDs) {
    ...NoumLink
  }
}
    ${NoumLinkFragmentDoc}`;
export type UnlinkNoumsMutationFn = Apollo.MutationFunction<UnlinkNoumsMutation, UnlinkNoumsMutationVariables>;

/**
 * __useUnlinkNoumsMutation__
 *
 * To run a mutation, you first call `useUnlinkNoumsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkNoumsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkNoumsMutation, { data, loading, error }] = useUnlinkNoumsMutation({
 *   variables: {
 *      noumLinkId: // value for 'noumLinkId'
 *      linkedNoumIDs: // value for 'linkedNoumIDs'
 *   },
 * });
 */
export function useUnlinkNoumsMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkNoumsMutation, UnlinkNoumsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkNoumsMutation, UnlinkNoumsMutationVariables>(UnlinkNoumsDocument, options);
      }
export type UnlinkNoumsMutationHookResult = ReturnType<typeof useUnlinkNoumsMutation>;
export type UnlinkNoumsMutationResult = Apollo.MutationResult<UnlinkNoumsMutation>;
export type UnlinkNoumsMutationOptions = Apollo.BaseMutationOptions<UnlinkNoumsMutation, UnlinkNoumsMutationVariables>;