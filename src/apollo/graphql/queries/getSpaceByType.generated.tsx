/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementOutputFragmentDoc } from '../fragments/elementOutput.generated';
import { NetworkOutputFragmentDoc } from '../fragments/networkOutput.generated';
import { TokenFragmentDoc, TokenTransactionFragmentDoc } from '../fragments/token.generated';
import { NoumOwnerUserFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceByTypeQueryVariables = Types.Exact<{
  type: Types.SpaceTypeEnum;
}>;


export type GetSpaceByTypeQuery = { __typename?: 'Query', getSpaceByType?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, description?: string | null, institution?: string | null, name?: string | null, permission?: string | null, profileImage?: string | null, status?: string | null, title?: string | null, type?: string | null, percentCompleted?: number | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null, accessToken?: string | null, connectionType?: Types.ConnectionTypeEnum | null, expiryDate?: string | null, isActive?: boolean | null, userId?: string | null } | null> | null, token?: { __typename?: 'Token', _id: string, count: number } | null, uid?: { __typename?: 'UserOutput', location?: string | null, bio?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null };


export const GetSpaceByTypeDocument = gql`
    query getSpaceByType($type: SpaceTypeEnum!) {
  getSpaceByType(type: $type) {
    _id
    description
    elements {
      ...ElementOutput
    }
    institution
    name
    networks {
      ...NetworkOutput
    }
    permission
    profileImage
    status
    title
    token {
      ...Token
    }
    type
    uid {
      ...NoumOwnerUser
    }
    percentCompleted
  }
}
    ${ElementOutputFragmentDoc}
${NetworkOutputFragmentDoc}
${TokenFragmentDoc}
${NoumOwnerUserFragmentDoc}`;

/**
 * __useGetSpaceByTypeQuery__
 *
 * To run a query within a React component, call `useGetSpaceByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceByTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetSpaceByTypeQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceByTypeQuery, GetSpaceByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceByTypeQuery, GetSpaceByTypeQueryVariables>(GetSpaceByTypeDocument, options);
      }
export function useGetSpaceByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceByTypeQuery, GetSpaceByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceByTypeQuery, GetSpaceByTypeQueryVariables>(GetSpaceByTypeDocument, options);
        }
export type GetSpaceByTypeQueryHookResult = ReturnType<typeof useGetSpaceByTypeQuery>;
export type GetSpaceByTypeLazyQueryHookResult = ReturnType<typeof useGetSpaceByTypeLazyQuery>;
export type GetSpaceByTypeQueryResult = Apollo.QueryResult<GetSpaceByTypeQuery, GetSpaceByTypeQueryVariables>;