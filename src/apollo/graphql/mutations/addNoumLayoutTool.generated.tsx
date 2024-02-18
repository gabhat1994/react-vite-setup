/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementOutputFragmentDoc } from '../fragments/elementOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddNoumLayoutToolMutationVariables = Types.Exact<{
  input: Types.AddNoumLayoutToolInput;
}>;


export type AddNoumLayoutToolMutation = { __typename?: 'Mutation', addNoumLayoutTool: { __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } };


export const AddNoumLayoutToolDocument = gql`
    mutation addNoumLayoutTool($input: AddNoumLayoutToolInput!) {
  addNoumLayoutTool(input: $input) {
    ...ElementOutput
  }
}
    ${ElementOutputFragmentDoc}`;
export type AddNoumLayoutToolMutationFn = Apollo.MutationFunction<AddNoumLayoutToolMutation, AddNoumLayoutToolMutationVariables>;

/**
 * __useAddNoumLayoutToolMutation__
 *
 * To run a mutation, you first call `useAddNoumLayoutToolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNoumLayoutToolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNoumLayoutToolMutation, { data, loading, error }] = useAddNoumLayoutToolMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNoumLayoutToolMutation(baseOptions?: Apollo.MutationHookOptions<AddNoumLayoutToolMutation, AddNoumLayoutToolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNoumLayoutToolMutation, AddNoumLayoutToolMutationVariables>(AddNoumLayoutToolDocument, options);
      }
export type AddNoumLayoutToolMutationHookResult = ReturnType<typeof useAddNoumLayoutToolMutation>;
export type AddNoumLayoutToolMutationResult = Apollo.MutationResult<AddNoumLayoutToolMutation>;
export type AddNoumLayoutToolMutationOptions = Apollo.BaseMutationOptions<AddNoumLayoutToolMutation, AddNoumLayoutToolMutationVariables>;