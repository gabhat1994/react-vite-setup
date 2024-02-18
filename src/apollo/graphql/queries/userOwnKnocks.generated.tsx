/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserOwnKnocksQueryVariables = Types.Exact<{
  socialHallId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type UserOwnKnocksQuery = { __typename?: 'Query', userOwnKnocks?: { __typename?: 'Knocks', count: number, data?: Array<{ __typename?: 'Knock', _id: string, createdAt?: any | null, knockStatus?: Types.KnockType | null, knockMessage?: string | null, knockerUserId: string, receiverUserId?: string | null, knockerUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null, receiverUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null, groupInfo?: { __typename?: 'SocialGroup', name?: string | null, users?: Array<{ __typename?: 'UserOutput', profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null } | null } | null> | null } | null } | null> | null } | null };


export const UserOwnKnocksDocument = gql`
    query userOwnKnocks($socialHallId: ID) {
  userOwnKnocks(socialHallId: $socialHallId) {
    count
    data {
      _id
      createdAt
      knockStatus
      knockMessage
      knockerUserId
      receiverUserId
      knockerUser {
        _id
        firstName
        lastName
        title
        userStatus
        profile {
          profilePicture
          profilePictureThumbnail
        }
      }
      receiverUser {
        _id
        firstName
        lastName
        userStatus
        profile {
          profilePicture
          profilePictureThumbnail
        }
      }
      groupInfo {
        name
        users {
          profile {
            profilePictureThumbnail
          }
        }
      }
    }
  }
}
    `;

/**
 * __useUserOwnKnocksQuery__
 *
 * To run a query within a React component, call `useUserOwnKnocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOwnKnocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOwnKnocksQuery({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *   },
 * });
 */
export function useUserOwnKnocksQuery(baseOptions?: Apollo.QueryHookOptions<UserOwnKnocksQuery, UserOwnKnocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOwnKnocksQuery, UserOwnKnocksQueryVariables>(UserOwnKnocksDocument, options);
      }
export function useUserOwnKnocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOwnKnocksQuery, UserOwnKnocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOwnKnocksQuery, UserOwnKnocksQueryVariables>(UserOwnKnocksDocument, options);
        }
export type UserOwnKnocksQueryHookResult = ReturnType<typeof useUserOwnKnocksQuery>;
export type UserOwnKnocksLazyQueryHookResult = ReturnType<typeof useUserOwnKnocksLazyQuery>;
export type UserOwnKnocksQueryResult = Apollo.QueryResult<UserOwnKnocksQuery, UserOwnKnocksQueryVariables>;