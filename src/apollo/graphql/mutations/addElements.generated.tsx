/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementOutputFragmentDoc } from '../fragments/elementOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddElementsMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Array<Types.InputMaybe<Types.CreateElementInput>> | Types.InputMaybe<Types.CreateElementInput>>;
  spaceId: Types.Scalars['ID'];
  isCalledFromNoumEditor2?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type AddElementsMutation = { __typename?: 'Mutation', addElements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } | null> | null };


export const AddElementsDocument = gql`
    mutation addElements($input: [CreateElementInput], $spaceId: ID!, $isCalledFromNoumEditor2: Boolean) {
  addElements(
    input: $input
    spaceId: $spaceId
    isCalledFromNoumEditor2: $isCalledFromNoumEditor2
  ) {
    ...ElementOutput
  }
}
    ${ElementOutputFragmentDoc}`;
export type AddElementsMutationFn = Apollo.MutationFunction<AddElementsMutation, AddElementsMutationVariables>;

/**
 * __useAddElementsMutation__
 *
 * To run a mutation, you first call `useAddElementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddElementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addElementsMutation, { data, loading, error }] = useAddElementsMutation({
 *   variables: {
 *      input: // value for 'input'
 *      spaceId: // value for 'spaceId'
 *      isCalledFromNoumEditor2: // value for 'isCalledFromNoumEditor2'
 *   },
 * });
 */
export function useAddElementsMutation(baseOptions?: Apollo.MutationHookOptions<AddElementsMutation, AddElementsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddElementsMutation, AddElementsMutationVariables>(AddElementsDocument, options);
      }
export type AddElementsMutationHookResult = ReturnType<typeof useAddElementsMutation>;
export type AddElementsMutationResult = Apollo.MutationResult<AddElementsMutation>;
export type AddElementsMutationOptions = Apollo.BaseMutationOptions<AddElementsMutation, AddElementsMutationVariables>;