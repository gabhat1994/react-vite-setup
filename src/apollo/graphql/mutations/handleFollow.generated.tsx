/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HandleFollowMutationVariables = Types.Exact<{
  action: Types.FollowActionEnum;
  spaceId: Types.Scalars['ID'];
  source?: Types.InputMaybe<Types.FollowSource>;
}>;


export type HandleFollowMutation = { __typename?: 'Mutation', handleFollow?: { __typename?: 'SpaceOutput', _id?: string | null, isFollowing?: boolean | null, connectionId?: string | null, followersCount?: number | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, bodyContent?: string | null, bodyContentJson?: any | null, bodyContentType?: Types.BodyContentEnum | null, elementType?: string | null, headerContent?: string | null, position?: number | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, bodyContentJson?: any | null, headerContent?: string | null, isDeleted?: boolean | null, position?: number | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, bodyContentJson?: any | null, headerContent?: string | null, isDeleted?: boolean | null, position?: number | null } | null } | null> | null } | null };


export const HandleFollowDocument = gql`
    mutation handleFollow($action: FollowActionEnum!, $spaceId: ID!, $source: FollowSource) {
  handleFollow(action: $action, spaceId: $spaceId, source: $source) {
    _id
    isFollowing
    connectionId
    followersCount
    elements {
      _id
      bodyContent
      bodyContentJson
      bodyContentType
      draft {
        bodyContent
        bodyContentJson
        headerContent
        isDeleted
        position
      }
      elementType
      headerContent
      position
      status
      tempStatus
      unSaved {
        bodyContent
        bodyContentJson
        headerContent
        isDeleted
        position
      }
      viewOnly
    }
  }
}
    `;
export type HandleFollowMutationFn = Apollo.MutationFunction<HandleFollowMutation, HandleFollowMutationVariables>;

/**
 * __useHandleFollowMutation__
 *
 * To run a mutation, you first call `useHandleFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleFollowMutation, { data, loading, error }] = useHandleFollowMutation({
 *   variables: {
 *      action: // value for 'action'
 *      spaceId: // value for 'spaceId'
 *      source: // value for 'source'
 *   },
 * });
 */
export function useHandleFollowMutation(baseOptions?: Apollo.MutationHookOptions<HandleFollowMutation, HandleFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleFollowMutation, HandleFollowMutationVariables>(HandleFollowDocument, options);
      }
export type HandleFollowMutationHookResult = ReturnType<typeof useHandleFollowMutation>;
export type HandleFollowMutationResult = Apollo.MutationResult<HandleFollowMutation>;
export type HandleFollowMutationOptions = Apollo.BaseMutationOptions<HandleFollowMutation, HandleFollowMutationVariables>;