/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SocialHallByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type SocialHallByIdQuery = { __typename?: 'Query', socialHallById?: { __typename?: 'SocialHall', _id: string, eventId?: string | null } | null };


export const SocialHallByIdDocument = gql`
    query socialHallById($id: ID) {
  socialHallById(id: $id) {
    _id
    eventId
  }
}
    `;

/**
 * __useSocialHallByIdQuery__
 *
 * To run a query within a React component, call `useSocialHallByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSocialHallByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSocialHallByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSocialHallByIdQuery(baseOptions?: Apollo.QueryHookOptions<SocialHallByIdQuery, SocialHallByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SocialHallByIdQuery, SocialHallByIdQueryVariables>(SocialHallByIdDocument, options);
      }
export function useSocialHallByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SocialHallByIdQuery, SocialHallByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SocialHallByIdQuery, SocialHallByIdQueryVariables>(SocialHallByIdDocument, options);
        }
export type SocialHallByIdQueryHookResult = ReturnType<typeof useSocialHallByIdQuery>;
export type SocialHallByIdLazyQueryHookResult = ReturnType<typeof useSocialHallByIdLazyQuery>;
export type SocialHallByIdQueryResult = Apollo.QueryResult<SocialHallByIdQuery, SocialHallByIdQueryVariables>;