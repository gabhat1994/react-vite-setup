/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyCircleQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MyCircleQuery = { __typename?: 'Query', myCircle?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, type?: string | null, projectType?: string | null, description?: string | null, profileImage?: string | null, followersCount?: number | null, isFavourited?: boolean | null, status?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null> | null } | null };


export const MyCircleDocument = gql`
    query myCircle($offset: Int, $limit: Int) {
  myCircle(offset: $offset, limit: $limit) {
    data {
      _id
      name
      title
      type
      projectType
      description
      profileImage
      followersCount
      isFavourited
      status
      uid {
        _id
        firstName
        lastName
        title
        userStatus
        location
        profile {
          profilePicture
        }
      }
      category {
        _id
        name
      }
    }
    count
  }
}
    `;

/**
 * __useMyCircleQuery__
 *
 * To run a query within a React component, call `useMyCircleQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCircleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCircleQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMyCircleQuery(baseOptions?: Apollo.QueryHookOptions<MyCircleQuery, MyCircleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCircleQuery, MyCircleQueryVariables>(MyCircleDocument, options);
      }
export function useMyCircleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCircleQuery, MyCircleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCircleQuery, MyCircleQueryVariables>(MyCircleDocument, options);
        }
export type MyCircleQueryHookResult = ReturnType<typeof useMyCircleQuery>;
export type MyCircleLazyQueryHookResult = ReturnType<typeof useMyCircleLazyQuery>;
export type MyCircleQueryResult = Apollo.QueryResult<MyCircleQuery, MyCircleQueryVariables>;