/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceConnectionBasicFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestConnectionMutationVariables = Types.Exact<{
  requestedSpaceId: Types.Scalars['ID'];
  ownSpaceId: Types.Scalars['ID'];
}>;


export type RequestConnectionMutation = { __typename?: 'Mutation', requestConnection?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null };


export const RequestConnectionDocument = gql`
    mutation requestConnection($requestedSpaceId: ID!, $ownSpaceId: ID!) {
  requestConnection(requestedSpaceId: $requestedSpaceId, ownSpaceId: $ownSpaceId) {
    _id
    ...SpaceConnectionBasic
  }
}
    ${SpaceConnectionBasicFragmentDoc}`;
export type RequestConnectionMutationFn = Apollo.MutationFunction<RequestConnectionMutation, RequestConnectionMutationVariables>;

/**
 * __useRequestConnectionMutation__
 *
 * To run a mutation, you first call `useRequestConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestConnectionMutation, { data, loading, error }] = useRequestConnectionMutation({
 *   variables: {
 *      requestedSpaceId: // value for 'requestedSpaceId'
 *      ownSpaceId: // value for 'ownSpaceId'
 *   },
 * });
 */
export function useRequestConnectionMutation(baseOptions?: Apollo.MutationHookOptions<RequestConnectionMutation, RequestConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestConnectionMutation, RequestConnectionMutationVariables>(RequestConnectionDocument, options);
      }
export type RequestConnectionMutationHookResult = ReturnType<typeof useRequestConnectionMutation>;
export type RequestConnectionMutationResult = Apollo.MutationResult<RequestConnectionMutation>;
export type RequestConnectionMutationOptions = Apollo.BaseMutationOptions<RequestConnectionMutation, RequestConnectionMutationVariables>;