/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserActiveKnocksQueryVariables = Types.Exact<{
  socialHallId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type UserActiveKnocksQuery = { __typename?: 'Query', userActiveKnocks?: { __typename?: 'Knocks', count: number, data?: Array<{ __typename?: 'Knock', _id: string, createdAt?: any | null, knockStatus?: Types.KnockType | null, knockMessage?: string | null, knockerUserId: string, receiverUserId?: string | null, knockerUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null } | null> | null } | null };


export const UserActiveKnocksDocument = gql`
    query userActiveKnocks($socialHallId: ID) {
  userActiveKnocks(socialHallId: $socialHallId) {
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
    }
  }
}
    `;

/**
 * __useUserActiveKnocksQuery__
 *
 * To run a query within a React component, call `useUserActiveKnocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserActiveKnocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActiveKnocksQuery({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *   },
 * });
 */
export function useUserActiveKnocksQuery(baseOptions?: Apollo.QueryHookOptions<UserActiveKnocksQuery, UserActiveKnocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserActiveKnocksQuery, UserActiveKnocksQueryVariables>(UserActiveKnocksDocument, options);
      }
export function useUserActiveKnocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserActiveKnocksQuery, UserActiveKnocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserActiveKnocksQuery, UserActiveKnocksQueryVariables>(UserActiveKnocksDocument, options);
        }
export type UserActiveKnocksQueryHookResult = ReturnType<typeof useUserActiveKnocksQuery>;
export type UserActiveKnocksLazyQueryHookResult = ReturnType<typeof useUserActiveKnocksLazyQuery>;
export type UserActiveKnocksQueryResult = Apollo.QueryResult<UserActiveKnocksQuery, UserActiveKnocksQueryVariables>;