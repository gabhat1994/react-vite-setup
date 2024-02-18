/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowBasicFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HandleSowLinkingMutationVariables = Types.Exact<{
  contractId: Types.Scalars['ID'];
  sowId: Types.Scalars['ID'];
  link: Types.Scalars['Boolean'];
}>;


export type HandleSowLinkingMutation = { __typename?: 'Mutation', handleSOWLinking: { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null } };


export const HandleSowLinkingDocument = gql`
    mutation HandleSOWLinking($contractId: ID!, $sowId: ID!, $link: Boolean!) {
  handleSOWLinking(contractId: $contractId, sowId: $sowId, link: $link) {
    ...SOWBasic
  }
}
    ${SowBasicFragmentDoc}`;
export type HandleSowLinkingMutationFn = Apollo.MutationFunction<HandleSowLinkingMutation, HandleSowLinkingMutationVariables>;

/**
 * __useHandleSowLinkingMutation__
 *
 * To run a mutation, you first call `useHandleSowLinkingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleSowLinkingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleSowLinkingMutation, { data, loading, error }] = useHandleSowLinkingMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      sowId: // value for 'sowId'
 *      link: // value for 'link'
 *   },
 * });
 */
export function useHandleSowLinkingMutation(baseOptions?: Apollo.MutationHookOptions<HandleSowLinkingMutation, HandleSowLinkingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleSowLinkingMutation, HandleSowLinkingMutationVariables>(HandleSowLinkingDocument, options);
      }
export type HandleSowLinkingMutationHookResult = ReturnType<typeof useHandleSowLinkingMutation>;
export type HandleSowLinkingMutationResult = Apollo.MutationResult<HandleSowLinkingMutation>;
export type HandleSowLinkingMutationOptions = Apollo.BaseMutationOptions<HandleSowLinkingMutation, HandleSowLinkingMutationVariables>;