/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementOutputFragmentDoc } from '../fragments/elementOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetNoumLayoutToolMetaValueMutationVariables = Types.Exact<{
  input: Types.SetNoumLayoutToolMetaValueInput;
}>;


export type SetNoumLayoutToolMetaValueMutation = { __typename?: 'Mutation', setNoumLayoutToolMetaValue: { __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } };


export const SetNoumLayoutToolMetaValueDocument = gql`
    mutation setNoumLayoutToolMetaValue($input: SetNoumLayoutToolMetaValueInput!) {
  setNoumLayoutToolMetaValue(input: $input) {
    ...ElementOutput
  }
}
    ${ElementOutputFragmentDoc}`;
export type SetNoumLayoutToolMetaValueMutationFn = Apollo.MutationFunction<SetNoumLayoutToolMetaValueMutation, SetNoumLayoutToolMetaValueMutationVariables>;

/**
 * __useSetNoumLayoutToolMetaValueMutation__
 *
 * To run a mutation, you first call `useSetNoumLayoutToolMetaValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNoumLayoutToolMetaValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNoumLayoutToolMetaValueMutation, { data, loading, error }] = useSetNoumLayoutToolMetaValueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetNoumLayoutToolMetaValueMutation(baseOptions?: Apollo.MutationHookOptions<SetNoumLayoutToolMetaValueMutation, SetNoumLayoutToolMetaValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetNoumLayoutToolMetaValueMutation, SetNoumLayoutToolMetaValueMutationVariables>(SetNoumLayoutToolMetaValueDocument, options);
      }
export type SetNoumLayoutToolMetaValueMutationHookResult = ReturnType<typeof useSetNoumLayoutToolMetaValueMutation>;
export type SetNoumLayoutToolMetaValueMutationResult = Apollo.MutationResult<SetNoumLayoutToolMetaValueMutation>;
export type SetNoumLayoutToolMetaValueMutationOptions = Apollo.BaseMutationOptions<SetNoumLayoutToolMetaValueMutation, SetNoumLayoutToolMetaValueMutationVariables>;