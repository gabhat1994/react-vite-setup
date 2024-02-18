/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserNoumsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  uid?: Types.InputMaybe<Types.Scalars['ID']>;
  filter?: Types.InputMaybe<Types.UserNoumsFilter>;
}>;


export type GetUserNoumsQuery = { __typename?: 'Query', getUserNoums?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null, category?: { __typename?: 'ProjectChamberCategory', name: string, _id: string } | null } | null> | null } | null };


export const GetUserNoumsDocument = gql`
    query getUserNoums($limit: Int, $offset: Int, $uid: ID, $filter: UserNoumsFilter) {
  getUserNoums(offset: $offset, limit: $limit, uid: $uid, filter: $filter) {
    count
    data {
      _id
      name
      title
      profileImage
      uid {
        _id
      }
      category {
        name
        _id
      }
    }
  }
}
    `;

/**
 * __useGetUserNoumsQuery__
 *
 * To run a query within a React component, call `useGetUserNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNoumsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      uid: // value for 'uid'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUserNoumsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserNoumsQuery, GetUserNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserNoumsQuery, GetUserNoumsQueryVariables>(GetUserNoumsDocument, options);
      }
export function useGetUserNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNoumsQuery, GetUserNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserNoumsQuery, GetUserNoumsQueryVariables>(GetUserNoumsDocument, options);
        }
export type GetUserNoumsQueryHookResult = ReturnType<typeof useGetUserNoumsQuery>;
export type GetUserNoumsLazyQueryHookResult = ReturnType<typeof useGetUserNoumsLazyQuery>;
export type GetUserNoumsQueryResult = Apollo.QueryResult<GetUserNoumsQuery, GetUserNoumsQueryVariables>;