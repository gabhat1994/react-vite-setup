/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementOutputFragmentDoc } from '../fragments/elementOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DuplicateNoumLayoutToolMutationVariables = Types.Exact<{
  toolId: Types.Scalars['ID'];
}>;


export type DuplicateNoumLayoutToolMutation = { __typename?: 'Mutation', duplicateNoumLayoutTool: { __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } };


export const DuplicateNoumLayoutToolDocument = gql`
    mutation duplicateNoumLayoutTool($toolId: ID!) {
  duplicateNoumLayoutTool(toolId: $toolId) {
    ...ElementOutput
  }
}
    ${ElementOutputFragmentDoc}`;
export type DuplicateNoumLayoutToolMutationFn = Apollo.MutationFunction<DuplicateNoumLayoutToolMutation, DuplicateNoumLayoutToolMutationVariables>;

/**
 * __useDuplicateNoumLayoutToolMutation__
 *
 * To run a mutation, you first call `useDuplicateNoumLayoutToolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateNoumLayoutToolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateNoumLayoutToolMutation, { data, loading, error }] = useDuplicateNoumLayoutToolMutation({
 *   variables: {
 *      toolId: // value for 'toolId'
 *   },
 * });
 */
export function useDuplicateNoumLayoutToolMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateNoumLayoutToolMutation, DuplicateNoumLayoutToolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateNoumLayoutToolMutation, DuplicateNoumLayoutToolMutationVariables>(DuplicateNoumLayoutToolDocument, options);
      }
export type DuplicateNoumLayoutToolMutationHookResult = ReturnType<typeof useDuplicateNoumLayoutToolMutation>;
export type DuplicateNoumLayoutToolMutationResult = Apollo.MutationResult<DuplicateNoumLayoutToolMutation>;
export type DuplicateNoumLayoutToolMutationOptions = Apollo.BaseMutationOptions<DuplicateNoumLayoutToolMutation, DuplicateNoumLayoutToolMutationVariables>;