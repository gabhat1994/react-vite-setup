/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumQuestionOutputFragmentDoc } from '../fragments/noumQuestionOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetQuestionsForSpaceQueryVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.QuestionsFilter>;
  sort?: Types.InputMaybe<Types.SortType>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetQuestionsForSpaceQuery = { __typename?: 'Query', getQuestionsForSpace?: { __typename?: 'QuestionOutputResponse', count?: number | null, data?: Array<{ __typename?: 'NoumQuestionOutput', _id?: string | null, body?: string | null, questionImage?: string | null, expiryDate?: any | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, spaceId?: { __typename?: 'SpaceOutput', _id?: string | null } | null, answers?: Array<{ __typename?: 'AnswerOutput', _id?: string | null, body?: string | null, spaceId?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, tipDetails?: Array<{ __typename?: 'TipOutput', amount?: number | null, tipBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }> | null } | null> | null } | null> | null } | null, tipped?: { __typename?: 'QuestionOutputResponse', count?: number | null } | null, answered?: { __typename?: 'QuestionOutputResponse', count?: number | null } | null, close?: { __typename?: 'QuestionOutputResponse', count?: number | null } | null, open?: { __typename?: 'QuestionOutputResponse', count?: number | null } | null };


export const GetQuestionsForSpaceDocument = gql`
    query getQuestionsForSpace($spaceId: ID!, $filter: QuestionsFilter, $sort: SortType, $limit: Int, $offset: Int) {
  getQuestionsForSpace(
    spaceId: $spaceId
    filter: $filter
    sort: $sort
    limit: $limit
    offset: $offset
  ) {
    count
    data {
      ...NoumQuestionOutput
    }
  }
  tipped: getQuestionsForSpace(filter: {status: TIPPED}, spaceId: $spaceId) {
    count
  }
  answered: getQuestionsForSpace(filter: {status: ANSWERED}, spaceId: $spaceId) {
    count
  }
  close: getQuestionsForSpace(filter: {status: CLOSED}, spaceId: $spaceId) {
    count
  }
  open: getQuestionsForSpace(filter: {status: ACTIVE}, spaceId: $spaceId) {
    count
  }
}
    ${NoumQuestionOutputFragmentDoc}`;

/**
 * __useGetQuestionsForSpaceQuery__
 *
 * To run a query within a React component, call `useGetQuestionsForSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsForSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsForSpaceQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetQuestionsForSpaceQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionsForSpaceQuery, GetQuestionsForSpaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsForSpaceQuery, GetQuestionsForSpaceQueryVariables>(GetQuestionsForSpaceDocument, options);
      }
export function useGetQuestionsForSpaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsForSpaceQuery, GetQuestionsForSpaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsForSpaceQuery, GetQuestionsForSpaceQueryVariables>(GetQuestionsForSpaceDocument, options);
        }
export type GetQuestionsForSpaceQueryHookResult = ReturnType<typeof useGetQuestionsForSpaceQuery>;
export type GetQuestionsForSpaceLazyQueryHookResult = ReturnType<typeof useGetQuestionsForSpaceLazyQuery>;
export type GetQuestionsForSpaceQueryResult = Apollo.QueryResult<GetQuestionsForSpaceQuery, GetQuestionsForSpaceQueryVariables>;