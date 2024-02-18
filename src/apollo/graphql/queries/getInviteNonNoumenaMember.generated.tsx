/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { InviteNonNoumUserOutputFragmentDoc } from '../fragments/nonNoumenaMember.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInviteNonNoumenaMemberQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetInviteNonNoumenaMemberQuery = { __typename?: 'Query', getinviteNonNoumenaMember?: { __typename?: 'inviteNonNoumUsersOutput', count?: number | null, data?: Array<{ __typename?: 'inviteNonNoumUserOutput', _id: string, token?: string | null, isActive?: boolean | null, isVerified?: boolean | null, requestedForNoumId?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const GetInviteNonNoumenaMemberDocument = gql`
    query getInviteNonNoumenaMember($noumId: ID!) {
  getinviteNonNoumenaMember(noumId: $noumId) {
    data {
      ...InviteNonNoumUserOutput
    }
    count
  }
}
    ${InviteNonNoumUserOutputFragmentDoc}`;

/**
 * __useGetInviteNonNoumenaMemberQuery__
 *
 * To run a query within a React component, call `useGetInviteNonNoumenaMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInviteNonNoumenaMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInviteNonNoumenaMemberQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetInviteNonNoumenaMemberQuery(baseOptions: Apollo.QueryHookOptions<GetInviteNonNoumenaMemberQuery, GetInviteNonNoumenaMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInviteNonNoumenaMemberQuery, GetInviteNonNoumenaMemberQueryVariables>(GetInviteNonNoumenaMemberDocument, options);
      }
export function useGetInviteNonNoumenaMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInviteNonNoumenaMemberQuery, GetInviteNonNoumenaMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInviteNonNoumenaMemberQuery, GetInviteNonNoumenaMemberQueryVariables>(GetInviteNonNoumenaMemberDocument, options);
        }
export type GetInviteNonNoumenaMemberQueryHookResult = ReturnType<typeof useGetInviteNonNoumenaMemberQuery>;
export type GetInviteNonNoumenaMemberLazyQueryHookResult = ReturnType<typeof useGetInviteNonNoumenaMemberLazyQuery>;
export type GetInviteNonNoumenaMemberQueryResult = Apollo.QueryResult<GetInviteNonNoumenaMemberQuery, GetInviteNonNoumenaMemberQueryVariables>;