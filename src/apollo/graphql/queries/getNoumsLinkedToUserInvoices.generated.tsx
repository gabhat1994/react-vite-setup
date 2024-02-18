/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceBasicFragmentDoc, SpaceDraftDataFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumsLinkedToUserInvoicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNoumsLinkedToUserInvoicesQuery = { __typename?: 'Query', getNoumsLinkedToUserInvoices?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, description?: string | null, profileImage?: string | null, isFollowing?: boolean | null, followersCount?: number | null, fonts?: any | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null }> | null };


export const GetNoumsLinkedToUserInvoicesDocument = gql`
    query getNoumsLinkedToUserInvoices {
  getNoumsLinkedToUserInvoices {
    ...SpaceBasic
  }
}
    ${SpaceBasicFragmentDoc}`;

/**
 * __useGetNoumsLinkedToUserInvoicesQuery__
 *
 * To run a query within a React component, call `useGetNoumsLinkedToUserInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumsLinkedToUserInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumsLinkedToUserInvoicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNoumsLinkedToUserInvoicesQuery(baseOptions?: Apollo.QueryHookOptions<GetNoumsLinkedToUserInvoicesQuery, GetNoumsLinkedToUserInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumsLinkedToUserInvoicesQuery, GetNoumsLinkedToUserInvoicesQueryVariables>(GetNoumsLinkedToUserInvoicesDocument, options);
      }
export function useGetNoumsLinkedToUserInvoicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumsLinkedToUserInvoicesQuery, GetNoumsLinkedToUserInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumsLinkedToUserInvoicesQuery, GetNoumsLinkedToUserInvoicesQueryVariables>(GetNoumsLinkedToUserInvoicesDocument, options);
        }
export type GetNoumsLinkedToUserInvoicesQueryHookResult = ReturnType<typeof useGetNoumsLinkedToUserInvoicesQuery>;
export type GetNoumsLinkedToUserInvoicesLazyQueryHookResult = ReturnType<typeof useGetNoumsLinkedToUserInvoicesLazyQuery>;
export type GetNoumsLinkedToUserInvoicesQueryResult = Apollo.QueryResult<GetNoumsLinkedToUserInvoicesQuery, GetNoumsLinkedToUserInvoicesQueryVariables>;