/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ConversationOutputFragmentDoc } from '../fragments/conversationOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConversationByCidQueryVariables = Types.Exact<{
  cid?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetConversationByCidQuery = { __typename?: 'Query', getConversationByCid?: { __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null };


export const GetConversationByCidDocument = gql`
    query getConversationByCid($cid: String) {
  getConversationByCid(cid: $cid) {
    ...ConversationOutput
  }
}
    ${ConversationOutputFragmentDoc}`;

/**
 * __useGetConversationByCidQuery__
 *
 * To run a query within a React component, call `useGetConversationByCidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationByCidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationByCidQuery({
 *   variables: {
 *      cid: // value for 'cid'
 *   },
 * });
 */
export function useGetConversationByCidQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationByCidQuery, GetConversationByCidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationByCidQuery, GetConversationByCidQueryVariables>(GetConversationByCidDocument, options);
      }
export function useGetConversationByCidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationByCidQuery, GetConversationByCidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationByCidQuery, GetConversationByCidQueryVariables>(GetConversationByCidDocument, options);
        }
export type GetConversationByCidQueryHookResult = ReturnType<typeof useGetConversationByCidQuery>;
export type GetConversationByCidLazyQueryHookResult = ReturnType<typeof useGetConversationByCidLazyQuery>;
export type GetConversationByCidQueryResult = Apollo.QueryResult<GetConversationByCidQuery, GetConversationByCidQueryVariables>;