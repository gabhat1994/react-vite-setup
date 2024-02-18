/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLinkFragmentDoc } from '../fragments/noumLink.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkNoumsMutationVariables = Types.Exact<{
  linkedNoumIDs: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type LinkNoumsMutation = { __typename?: 'Mutation', linkNoums?: { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null };


export const LinkNoumsDocument = gql`
    mutation linkNoums($linkedNoumIDs: [ID!]!) {
  linkNoums(linkedNoumIDs: $linkedNoumIDs) {
    ...NoumLink
  }
}
    ${NoumLinkFragmentDoc}`;
export type LinkNoumsMutationFn = Apollo.MutationFunction<LinkNoumsMutation, LinkNoumsMutationVariables>;

/**
 * __useLinkNoumsMutation__
 *
 * To run a mutation, you first call `useLinkNoumsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkNoumsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkNoumsMutation, { data, loading, error }] = useLinkNoumsMutation({
 *   variables: {
 *      linkedNoumIDs: // value for 'linkedNoumIDs'
 *   },
 * });
 */
export function useLinkNoumsMutation(baseOptions?: Apollo.MutationHookOptions<LinkNoumsMutation, LinkNoumsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkNoumsMutation, LinkNoumsMutationVariables>(LinkNoumsDocument, options);
      }
export type LinkNoumsMutationHookResult = ReturnType<typeof useLinkNoumsMutation>;
export type LinkNoumsMutationResult = Apollo.MutationResult<LinkNoumsMutation>;
export type LinkNoumsMutationOptions = Apollo.BaseMutationOptions<LinkNoumsMutation, LinkNoumsMutationVariables>;