/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SocialHallByNameQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type SocialHallByNameQuery = { __typename?: 'Query', socialHallByName?: { __typename?: 'SocialHall', _id: string, eventId?: string | null } | null };


export const SocialHallByNameDocument = gql`
    query socialHallByName($name: String!) {
  socialHallByName(name: $name) {
    _id
    eventId
  }
}
    `;

/**
 * __useSocialHallByNameQuery__
 *
 * To run a query within a React component, call `useSocialHallByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSocialHallByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSocialHallByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSocialHallByNameQuery(baseOptions: Apollo.QueryHookOptions<SocialHallByNameQuery, SocialHallByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SocialHallByNameQuery, SocialHallByNameQueryVariables>(SocialHallByNameDocument, options);
      }
export function useSocialHallByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SocialHallByNameQuery, SocialHallByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SocialHallByNameQuery, SocialHallByNameQueryVariables>(SocialHallByNameDocument, options);
        }
export type SocialHallByNameQueryHookResult = ReturnType<typeof useSocialHallByNameQuery>;
export type SocialHallByNameLazyQueryHookResult = ReturnType<typeof useSocialHallByNameLazyQuery>;
export type SocialHallByNameQueryResult = Apollo.QueryResult<SocialHallByNameQuery, SocialHallByNameQueryVariables>;